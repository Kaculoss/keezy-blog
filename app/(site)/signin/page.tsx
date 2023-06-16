import { AuthForm } from "@/app/components";

const SignInPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-gray-100 py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default SignInPage;
