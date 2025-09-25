import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import Form from "../components/Form";

const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DummyData =[{
    'productName':'Copies','quantity':200,'price':50,'totalAmt':10000,'discPercent':10,'discAmt':1000,'finalAmt':9000
  },{
    'productName':'Pens','quantity':500,'price':10,'totalAmt':5000,'discPercent':5,'discAmt':250,'finalAmt':4750
  },{
    'productName':'Footballs','quantity':10,'price':200,'totalAmt':1000,'discPercent':0,'discAmt':0,'finalAmt':1000
  },{
    'productName':'Chocolates','quantity':50,'price':2,'totalAmt':1000,'discPercent':0,'discAmt':0,'finalAmt':1000
  }]
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          Table
        </div>
      </div>
      <Modal
        title="Create Bill"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form />
      </Modal>
    </div>
  );
};

export default MainPage;
