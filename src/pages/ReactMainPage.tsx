import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import ReactHookForm from "../components/Working/ReactHookForm";
import HomeTable from "../components/Working/HomeTable";
import YupForm from "../components/Working/Yup"

interface Product {
  productName: string;
  quantity: number;
  price: number;
}
const ReactMainPage: React.FC = () => {
  const product: Product[] = [
    { productName: "Copies", quantity: 100, price: 40 },
    { productName: "Pens", quantity: 300, price: 20 },
    { productName: "Footballs", quantity: 10, price: 1500 },
    { productName: "Chocolates", quantity: 500, price: 20 },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Functions
  const showModal = () => {
    setIsModalOpen(true);
  };

  //Math Function
  const totalAmount = (quantity: number, price: number) => {
    return quantity * price;
  };

  const discountPercent = (totalAmount: number) => {
    if (totalAmount < 5000) return 0;
    if (totalAmount < 10000) return 5;
    if (totalAmount < 15000) return 10;
    if (totalAmount < 20000) return 15;
    return 20;
  };

  const discountAmount = (discountPercent: number, totalAmount: number) => {
    return (discountPercent / 100) * totalAmount;
  };

  const finalAmount = (totalAmount: number, discountAmount: number) => {
    return totalAmount - discountAmount;
  };

  return (
    <div className="bg-red-500 h-screen w-screen p-2">
      <h2 className="text-2xl text-white p-2">Discount Bill</h2>
      <div className="bg-white border shadow-md rounded-xl p-4 w-full mx-auto text-black space-y-4">
        <Button
          type="primary"
          className="rounded-lg px-6 py-2"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Create Bill
        </Button>
        <div className="bg-white border shadow-md rounded-xl p-4 w-full">
          <HomeTable
            data={product}
            totalAmount={totalAmount}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            finalAmount={finalAmount}
          />
        </div>
      </div>
      <Modal
        title="Create Bill"
        closable={false}
        open={isModalOpen}
        footer={false}
        // onOk={handleOk}
        // onCancel={handleCancel}
      >
        {/* <ReactHookForm
          setIsModalOpen={setIsModalOpen}
          totalAmount={totalAmount}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          finalAmount={finalAmount}
        /> */}

        <YupForm
          setIsModalOpen={setIsModalOpen}
          totalAmount={totalAmount}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          finalAmount={finalAmount}
        />
      </Modal>
    </div>
  );
};

export default ReactMainPage;
