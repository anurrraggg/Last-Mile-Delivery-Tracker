export const calculateCharge = ({
  length,
  breadth,
  height,
  actualWeight,
  ratePerKg,
  paymentType,
  codCharge,
}) => {
  const volumetricWeight =
    (length * breadth * height) / 5000;

  const billableWeight = Math.max(
    actualWeight,
    volumetricWeight
  );

  let total = billableWeight * ratePerKg;

  if (paymentType === "COD") {
    total += codCharge;
  }

  return {
    volumetricWeight,
    billableWeight,
    total,
  };
};