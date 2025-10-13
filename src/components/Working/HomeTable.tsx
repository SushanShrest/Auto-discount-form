import { Table } from "antd";
import React from "react";

interface Product {
  productName: string;
  quantity: number;
  price: number;
}

interface HomeTableProps {
  data: Product[];
  totalAmount: (arg1: number, arg2: number) => number;
  discountPercent: (arg1: number) => number;
  discountAmount: (arg1: number, arg2: number) => number;
  finalAmount: (arg1: number, arg2: number) => number;
}
const HomeTable: React.FC<HomeTableProps> = ({
  data,
  totalAmount,
  discountPercent,
  discountAmount,
  finalAmount,
}) => {
  const columns = [
    {
      title: "SN",
      key: "sn",
      render: (_value: number, _record: Product, index: number) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_value: number) => <p>NRs {_value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Total Amount",
      key: "totalAmt",
      render: (
        _value: number,
        _record: { quantity: number; price: number }
      ) => <b>{totalAmount(_record.price, _record.quantity)}</b>,
    },

    {
      title: "Discount%",
      key: "discPercent",
      render: (
        _value: number,
        _record: { quantity: number; price: number }
      ) => (
        <b>{discountPercent(totalAmount(_record.price, _record.quantity))}%</b>
      ),
    },
    {
      title: "Discount Amount",
      key: "discAmt",
      render: (_value: number, record: { quantity: number; price: number }) => {
        const total = totalAmount(record.price, record.quantity);
        const percent = discountPercent(total);
        return <b>{discountAmount(total, percent)}</b>;
      },
    },
    {
      title: "Final Amount",
      key: "finalAmt",
      render: (_value: number, record: { quantity: number; price: number }) => {
        const total = totalAmount(record.price, record.quantity);
        const percent = discountPercent(total);
        const disAmount = discountAmount(total, percent);
        return <b>{finalAmount(total, disAmount)}</b>;
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.productName} //Added rowKey to ensure your data items include a unique key property.
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default HomeTable;
