import { FieldValues, useForm } from "react-hook-form";
import styles from "./Form.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmit: (data: FieldValues) => void;
}

const Form = ({ onSubmit }: Props) => {
  const validationSchema = z.object({
    description: z
      .string()
      .trim()
      .min(3, { message: "description should be atleast 3 characters" }),
    amount: z.number({ invalid_type_error: "Amount is required" }).min(0),
    category: z.string().trim().min(1, { message: "please select category" }),
  });

  type Form = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            className="form-control"
            id="description"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="text"
            className="form-control"
            id="amount"
          />

          {errors.amount && (
            <p className="text-danger">{errors.amount?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <div className="input-group">
            <select
              {...register("category")}
              className="form-select"
              id="category"
            >
              <option></option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          {errors.category && (
            <p className="text-danger">{errors.category?.message}</p>
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
