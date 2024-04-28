import BasePort from '@api/Base/domain/ports/BasePort';

import User from '../models/User';

export default abstract class UserRepository extends BasePort<User, string> {
  findUserByEmail!: (email: string) => Promise<User | null>;
}
