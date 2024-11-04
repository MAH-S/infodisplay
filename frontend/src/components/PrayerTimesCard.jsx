import React from "react";
import { Card, Table, Typography } from "antd";

const { Title, Text } = Typography;

function PrayerTimesCard({
  prayerTimes,
  prayerColumns,
  prayerData,
  nextPrayerIndex,
}) {
  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f" }}>
      <Title
        level={3}
        style={{ textAlign: "right", color: "#ffffff", fontSize: "24px" }}
      >
        مواقيت الصلاة
      </Title>
      {prayerTimes ? (
        <Table
          columns={prayerColumns}
          dataSource={prayerData.map((prayer, index) => ({
            ...prayer,
            className: index === nextPrayerIndex ? "highlight-row" : "",
          }))}
          pagination={false}
          showHeader={false}
          rowClassName={(record) => record.className}
          style={{ color: "#ffffff" }}
        />
      ) : (
        <Text style={{ color: "#ffffff", fontSize: "18px" }}>
          Loading prayer times...
        </Text>
      )}
    </Card>
  );
}

export default PrayerTimesCard;
