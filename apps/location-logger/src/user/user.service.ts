import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: RegisterDto): Promise<User> {
    const existingUser = await this.findOne(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'fullName', 'email', 'password'],
    });
  }
}
