import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async login(code: string, nick_name: string, avatar: string) {
    const data = await axios.get(`${process.env.OPEN_ID_URL}?appid=${process.env.APP_ID}&secret=${process.env.APP_SECRET}&js_code=${code}&grant_type=authorization_code`)
    
    if (!data.data.openid) {
      throw new HttpException('登录失败', HttpStatus.BAD_REQUEST)
    }

    // 查询用户是否存在
    const user = await this.prisma.client.findFirst({
      where: {
        openid: data.data.openid
      }
    })

    if (!user) {
      await this.prisma.client.create({
        data: {
          openid: data.data.openid,
          name: nick_name,
          avatar: avatar,
        }
      })
    }else{
      await this.prisma.client.update({
        where: { id: user.id },
        data: {
          name: nick_name,
          avatar: avatar
        }
      })
    }

    // 返回用户信息
    const userInfo = await this.prisma.client.findUnique({
      where: { openid: data.data.openid }
    })
    
    return {
      ...userInfo,
      token: this.jwtService.sign({ user_id: userInfo.id, openid: data.data.openid }, { expiresIn: '7d' })
    }
  }

  /**
   * 获取用户信息
   * @param id 用户id
   * @returns 用户信息
   */
  async getUserInfo(id: number) {
    return this.prisma.client.findUnique({
      where: { id: +id }
    })
  }
}
