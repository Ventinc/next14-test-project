import { type z } from "zod";
import { getServerSession } from "~/lib/auth";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export type ActionOpts<TInput> = {
  schema: z.Schema<TInput>;
  isAuth?: boolean;
};

const defaultOpts: Partial<ActionOpts<object>> = {
  isAuth: false,
};

export const createSafeAction = <TInput, TOutput>(
  opts: ActionOpts<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const allOpts: ActionOpts<TInput> = {
      ...defaultOpts,
      ...opts,
    };
    const validationResult = allOpts.schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    if (allOpts.isAuth) {
      const session = await getServerSession();

      if (!session) {
        return { error: "Unauthorized" };
      }
    }

    return handler(validationResult.data);
  };
};
