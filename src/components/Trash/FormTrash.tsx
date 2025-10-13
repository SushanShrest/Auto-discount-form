import React from "react";

const FormTrash: React.FC = () => {
  return (
    <div>
      <form action="">
        <label htmlFor="">Product Name</label>
        <input type="text" />

        <div className="flex">
          <label htmlFor="">Quantity</label>
          <input type="number" />

          <label htmlFor="">Per Cost</label>
          <input type="number" />
        </div>

        <label htmlFor="">Total amount</label>
        <input type="text" />

        <div className="bg-gray-200 flex shadow-md rounded-xl p-3">
          <div className="bg-green-200 shadow-md rounded-xl p-2">
            <label htmlFor="">Received Discount%</label>
            <input type="text" />

            <label htmlFor="">Discount Amount</label>
            <input type="text" />

            <label htmlFor="">Final Amount</label>
            <input type="text" />
          </div>
          <div className="bg-blue-200 shadow-md rounded-xl p-2">
            <h1 className="text-xl">Discount Condition</h1>
            <p>0%: &lt; 5000</p>
            <p>5%: &gt; 5000</p>
            <p>10%: &gt; 10000</p>
            <p>15%: &gt; 15000</p>
            <p>20%: &gt; 20000</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTrash;
