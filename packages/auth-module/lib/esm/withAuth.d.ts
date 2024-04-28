import { GetServerSidePropsContext } from 'next';
type GetServerSidePropsWithAuth<GenericUser> = (context: GetServerSidePropsContext, user: GenericUser) => unknown;
declare const withAuth: <GenericUser>(getServerSideProps: GetServerSidePropsWithAuth<GenericUser>) => (context: GetServerSidePropsContext) => Promise<unknown>;
export default withAuth;
