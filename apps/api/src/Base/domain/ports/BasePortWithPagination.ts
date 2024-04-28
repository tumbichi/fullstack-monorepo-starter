import BasePort from './BasePort';

export default abstract class BasePortWithPagination<
  T,
  IdType = number,
> extends BasePort<T, IdType> {
  abstract findAndCount(skip: number, take: number): Promise<[T[], number]>;
}
