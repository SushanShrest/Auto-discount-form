import React, { type Dispatch, type SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, message } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormFields = {
  productName: string;
  quantity: number;
  price: number;
};

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface CalculationProps {
  totalAmount: (arg1: number, arg2: number) => number;
  discountPercent: (arg1: number) => number;
  discountAmount: (arg1: number, arg2: number) => number;
  finalAmount: (arg1: number, arg2: number) => number;
}
// Combine both interfaces
type ReactHookFormProps = ModalProps & CalculationProps;

const YupForm: React.FC<ReactHookFormProps> = ({
  setIsModalOpen,
  totalAmount,
  discountPercent,
  discountAmount,
  finalAmount,
}) => {
  const schema = yup.object().shape({
    productName: yup.string().required("Required!"),
    price: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? 0 : value
      )
      .typeError("Please enter a valid number")
      .positive("Must Be positive!")
      .integer("Can not be in Decimal!")
      .required("Required!"),
    quantity: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Please enter a valid number")
      .positive("Must Be positive!")
      .integer("Can not be in Decimal!")
      .min(1, "Price Needs to be Greater Than zero!")
      .max(1000, "Out of Stock!")
      .required("Required!"),
  });
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormFields>({
    // defaultValues: {
    //   quantity: 0,
    //   price: 0,
    // },
    resolver: yupResolver(schema),
  });

  const quantity = watch("quantity");
  const price = watch("price");

  //   const total = quantity * price;
  const total = totalAmount(quantity, price);
  const discP = discountPercent(total);
  const discA = discountAmount(discP, total);
  const final = finalAmount(total, discA);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    messageApi.success("Product added Successfully");
    reset();
    setIsModalOpen(false);
  };

  // Modal Functions
  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName" className="font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter product name"
            {...register("productName")}
          />
          {errors.productName && (
            <span className="text-red-500">{errors.productName.message}</span>
          )}
        </div>

        {/* Quantity & Per Cost */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Quantity
            </label>
            <input
              type="text"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
              {...register("quantity")}
            />
            {errors.quantity && (
              <span className="text-red-500">{errors.quantity.message}</span>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="perCost" className="font-medium mb-1">
              Per Cost
            </label>
            <input
              type="text"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex flex-col">
          <label htmlFor="totalAmount" className="font-medium mb-1">
            Total Amount
          </label>
          <input
            type="number"
            id="totalAmount"
            className="border rounded-lg p-2 focus:outline-none"
            value={total ?? 0}
            readOnly
          />
        </div>
        {/* Discount & Condition Section */}
        <div className="flex gap-4">
          {/* Discount Inputs */}
          <div className="flex-1 bg-green-50 shadow-md rounded-xl p-4 space-y-3">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Received Discount %</label>
              <input
                type="text"
                className="border rounded-lg p-2 focus:outline-none"
                value={`${discP ?? 0} %`}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Discount Amount</label>
              <input
                type="number"
                className="border rounded-lg p-2 focus:outline-none"
                value={discA ?? 0}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Final Amount</label>
              <input
                type="number"
                className="border rounded-lg p-2 focus:outline-none"
                value={final ?? 0}
                readOnly
              />
            </div>
          </div>

          {/* Discount Conditions */}
          <div className="flex-1 bg-blue-50 shadow-md rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Discount Condition</h2>
            <ul className="list-disc list-inside space-y-1 text-sm font-semibold">
              <li>0%: &lt; 5000</li>
              <li>5%: &gt; 5000</li>
              <li>10%: &gt; 10000</li>
              <li>15%: &gt; 15000</li>
              <li>20%: &gt; 20000</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 flex-row-reverse">
          <Button
            disabled={isSubmitting}
            variant="solid"
            color="danger"
            htmlType="submit"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
          <Button variant="solid" color="purple" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YupForm;
