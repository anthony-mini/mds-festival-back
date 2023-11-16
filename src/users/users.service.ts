import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const isAlreadyUser = await this.users.findOneBy({ email: dto.email });

    if (isAlreadyUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(dto.password)) {
      throw new BadRequestException('Password is not valid');
    }

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 12);

      const newUser = this.users.create({ ...dto, hash: hashedPassword });

      await this.users.save(newUser);

      return newUser;
    } catch (error) {
      throw new ConflictException(
        'An unexpected error occurred during user registration.',
      );
    }
  }

  findAll(): Promise<User[]> {
    return this.users.find();
  }

  async findOne(id: number): Promise<User> {
    const found = this.users.findOneBy({ id });
    if (!found) throw new NotFoundException(`User #${id} not found`);
    return found;
  }

  async findOneByEmail(email: string): Promise<User> {
    const found = await this.users.findOneBy({ email });
    if (!found) throw new NotFoundException(`User ${email} not found`);
    return found;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.users.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    // If password needs to be updated, hash the new password before updating
    if (dto.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(dto.password)) {
        throw new BadRequestException('Password is not valid');
      }
      dto.password = await bcrypt.hash(dto.password, 12);
    }

    try {
      // Only update the fields provided in dto
      await this.users.update(id, { ...dto });

      // Return the updated user
      return await this.users.findOneBy({ id });
    } catch (error) {
      throw new ConflictException(`User #${id} could not be updated`);
    }
  }

  async remove(id: number): Promise<void> {
    const done = await this.users.delete(id);
    if (done.affected != 1) throw new NotFoundException();
  }
}
