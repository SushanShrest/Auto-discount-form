import React, { type Dispatch, type SetStateAction } from "react";

interface Product {
  productName: string;
  quantity: number;
  price: number;
}

interface FormDataProps {
  productName: string | null;
  setProductName: Dispatch<SetStateAction<string | null>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  totalAmt: number | null;
  setTotalAmt: Dispatch<SetStateAction<number | null>>;
  discPercent: number | null;
  setDiscPercent: Dispatch<SetStateAction<number | null>>;
  discAmt: number | null;
  setDiscAmt: Dispatch<SetStateAction<number | null>>;
  finalAmt: number | null;
  setFinalAmt: Dispatch<SetStateAction<number | null>>;
}

interface FormProps {
  data: Product[];
  formData: FormDataProps;
  totalAmount: (arg1: number, arg2: number) => number;
  discountPercent: (arg1: number) => number;
  discountAmount: (arg1: number, arg2: number) => number;
  finalAmount: (arg1: number, arg2: number) => number;
}

const Form: React.FC<FormProps> = ({
  data,
  totalAmount,
  discountPercent,
  discountAmount,
  finalAmount,
  formData,
}) => {
  const {
    productName,
    setProductName,
    quantity,
    setQuantity,
    price,
    setPrice,
    totalAmt,
    setTotalAmt,
    discPercent,
    setDiscPercent,
    discAmt,
    setDiscAmt,
    finalAmt,
    setFinalAmt,
  } = formData;
  return (
    <div>
      <form className="space-y-4">
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="productName" className="font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter product name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>

        {/* Quantity & Per Cost */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="perCost" className="font-medium mb-1">
              Per Cost
            </label>
            <input
              type="number"
              id="perCost"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="0"
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
            />
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
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={totalAmount(quantity, price)}
            onChange={(e) => {
              setTotalAmt(Number(e.target.value));
            }}
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
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={discountPercent(totalAmt ?? 0)}
                onChange={(e) => {
                  setDiscPercent(Number(e.target.value));
                }}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Discount Amount</label>
              <input
                type="text"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={discountAmount(discPercent ?? 0, totalAmt ?? 0)}
                onChange={(e) => {
                  setDiscAmt(Number(e.target.value));
                }}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Final Amount</label>
              <input
                type="text"
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                value={finalAmount(totalAmt ?? 0, discAmt ?? 0)}
                onChange={(e) => {
                  setFinalAmt(Number(e.target.value));
                }}
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
      </form>
    </div>
  );
};

export default Form;
