const orderInvoice = (
  orderNo,
  customerName,
  customerPhone,
  customerAddress,
  orderItems,
  subTotal,
  deliveryCost,
  discount,
  total
) => {
  return `
    <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Invoice</title>
      <style>
        body{
          font-family: "Inter", sans-serif;
          background:#F8F9FC;
          margin:0;
          padding:0;
          color:#1F2937;
        }
        .invoice-container{
          max-width:750px;
          margin:50px auto;
          background:#fff;
          padding:32px;
          border-radius:14px;
          border:1px solid #E4E7EC;
          box-shadow:0 8px 32px rgba(0,0,0,0.05);
        }


        .brand-name{
          font-size:22px;
          font-weight:800;
          color:#2E5AAC;
        }

        .tag{
          padding:6px 12px;
          font-size:11px;
          font-weight:600;
          background:#4C7CF9;
          color:#fff;
          border-radius:6px;
          text-transform:uppercase;
          letter-spacing:.6px;
        }

         .bill-info{
          display:flex;
          justify-content:space-between;
          margin-top:14px;
          font-size:14px;
        }

        .bill-section{
          margin-top:24px;
          padding:16px 18px;
          border-radius:10px;
          background:#F1F5FF;
          border:1px solid #D6E2FF;
        }

        /* Items list uses a table for better email-client compatibility. */
        table.items-table{width:100%;border-collapse:collapse;margin-top:20px;font-size:14px}
        table.items-table th{font-weight:600;color:#334155;border-bottom:2px solid #DCE3EF;padding:12px 10px;background:#EEF3FF;text-align:left}
        table.items-table td{padding:10px 12px;border-bottom:1px dashed #D7DDE8;vertical-align:middle}
        table.items-table tr:nth-child(even) td{background:#F9FAFF}
        table.items-table td.qty{text-align:center;width:80px}
        table.items-table td.rate, table.items-table td.amount{text-align:right;width:110px}

        .summary{
          text-align:right;
          margin-top:26px;
          border-top:2px solid #DCE3EF;
          padding-top:16px;
          font-size:15px;
        }

        .summary-line{
          display:flex;
          justify-content:space-between;
          padding:6px 0;
          gap:20px;
        }

        .total{
          font-weight:800;
          font-size:18px;
          border-top:1px solid #D7DDE8;
          padding-top:10px;
          color:#2E5AAC;
        }
      </style>
      </head>
      <body>

      <div class="invoice-container">

        <div class="invoice-info">
          <h2>Order No: <strong>${orderNo}</strong></h2>
          <h2>Invoice Date: <strong> ${new Date().toLocaleDateString()} </strong></h2>
        </div>

        <div class="bill-section">
          <div><strong>Bill To</strong></div><br/>
          <div class="bill-info">
            <div>
              ${customerName} <br/>
              Mobile: ${customerPhone} <br/>
              Address: ${customerAddress}
            </div>
          </div>
        </div>

        <table class="items-table" style="width:100%;border-collapse:collapse;margin-top:20px;font-family:Inter, Arial, sans-serif;">
          <thead>
            <tr>
              <th style="padding:12px 10px;text-align:left">Items</th>
              <th style="padding:12px 10px;text-align:center;width:80px">Qty</th>
              <th style="padding:12px 10px;text-align:right;width:110px">Rate</th>
              <th style="padding:12px 10px;text-align:right;width:110px">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems
              .map(
                (item, idx) =>
                  `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px dashed #D7DDE8;">${
                    item.productId.title
                  }</td>
                  <td class="qty" style="padding:10px 12px;text-align:center;border-bottom:1px dashed #D7DDE8;">${
                    item.qty
                  }</td>
                  <td class="rate" style="padding:10px 12px;text-align:right;border-bottom:1px dashed #D7DDE8;">${
                    item.productId.discontPrice
                  }</td>
                  <td class="amount" style="padding:10px 12px;text-align:right;border-bottom:1px dashed #D7DDE8;">${
                    item.productId.discontPrice * item.qty
                  }</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <div class="summary">
          <div class="summary-line">
            <div>Sub Total--</div>
            <div>${subTotal}$</div>
          </div>
          <div class="summary-line">
            <div>Delivery Cost--</div>
            <div>${deliveryCost}$</div>
          </div>
          <div class="summary-line">
            <div>Discount--</div>
            <div>${discount}$</div>
          </div>
          <div class="summary-line total">
            <div>Total--</div>
            <div>${total}$</div>
          </div>
        </div>

      </div>

      </body>
      </html>
`;
};

module.exports = orderInvoice;
