import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../users/enums/role-user.enums';
import { User } from '../users/entities/user.entity';
import { faker } from '@faker-js/faker';

const PEOPLE = 3;

export class Mock1700131550295 implements MigrationInterface {
  public async up(run: QueryRunner): Promise<void> {
    await run.manager.save(
      run.manager.create<User>(User, {
        email: 'j.doe@fake.com',
        hash: '$2a$12$vVkSh7yvkxYh/UZKzPQQKe07AaJBA6WAti3WbdDzFOtKejqx6H72G',
        nom: 'Doe',
        prenom: 'John',
        role: Role.Admin,
      }),
    );
    for (let i = 1; i <= PEOPLE; i++) {
      await run.manager.save(
        run.manager.create<User>(User, {
          email: faker.internet.email(),
          hash: '$2a$12$JiWwgFQaki7K5.xole5GFuj3duMgV3W5SQ8joCewO4SiQjvNeAGia',
          nom: faker.person.lastName(),
          prenom: faker.person.firstName(),
          role: Role.Spectator,
        }),
      );
    }
  }

  public async down(run: QueryRunner): Promise<void> {
    await run.query('DELETE FROM user');
  }
}
