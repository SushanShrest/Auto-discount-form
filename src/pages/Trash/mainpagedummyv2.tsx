import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../components/Working/Form";
import HomeTable from "../components/Working/HomeTable";

interface Product {
  productName: string;
  quantity: number;
  price: number;
}

const MainPage: React.FC = () => {
  const productData = (): Product[] => {
    const saved = localStorage.getItem("product");
    if (saved) {
      try {
        return JSON.parse(saved) as Product[];
      } catch {
        console.log("Invalid JSON in localStorage");
        return dummyProducts;
      }
    }
    return dummyProducts;
  };

  const dummyProducts: Product[] = [
    { productName: "Copies", quantity: 100, price: 40 },
    { productName: "Pens", quantity: 300, price: 20 },
    { productName: "Footballs", quantity: 10, price: 1500 },
    { productName: "Chocolates", quantity: 500, price: 20 },
  ];

  const [product, setProduct] = useState<Product[]>(productData());

  const [productName, setProductName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [totalAmt, setTotalAmt] = useState<number | null>(null);
  const [discPercent, setDiscPercent] = useState<number | null>(null);
  const [discAmt, setDiscAmt] = useState<number | null>(null);
  const [finalAmt, setFinalAmt] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(product)); // object to json
  }, [product]);

  const formData = {
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
  };

  // Modal Functions
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        closable={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          data={product}
          totalAmount={totalAmount}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          finalAmount={finalAmount}
          formData={formData}
        />
      </Modal>
    </div>
  );
};

export default MainPage;
