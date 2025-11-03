const orderInvoice = ()=>{
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

  .header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:28px;
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

  .invoice-info, .bill-info{
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

  .items-header, .item-row{
    display:flex;
    justify-content:space-between;
    padding:12px 0;
    font-size:14px;
  }

  .items-header{
    font-weight:600;
    color:#334155;
    border-bottom:2px solid #DCE3EF;
    background:#EEF3FF;
    border-radius:8px;
    padding:12px 10px;
  }

  .item-row{
    border-bottom:1px dashed #D7DDE8;
  }

  .item-row:nth-child(even){
    background:#F9FAFF;
  }

  .item-row:hover{
    background:#EEF3FF;
    transition:0.2s;
  }

  .summary{
    margin-top:26px;
    border-top:2px solid #DCE3EF;
    padding-top:16px;
    font-size:15px;
  }

  .summary-line{
    display:flex;
    justify-content:space-between;
    padding:6px 0;
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

  <div class="header">
    <div class="brand-name">A-1 E-commerce Dashboard</div>
    <div class="tag">Bill of Supply</div>
  </div>

  <div class="invoice-info">
    <div>Order No: <strong>#{{Order no}}</strong></div>
    <div>Invoice Date: <strong>{{invoiceDate}}</strong></div>
    <div>Due Date: <strong>{{dueDate}}</strong></div>
  </div>

  <div class="bill-section">
    <div><strong>Bill To</strong></div><br/>
    <div class="bill-info">
      <div>
        {{customerName}} <br/>
        Mobile: {{customerPhone}} <br/>
        Address: {{customerAddress}}
      </div>
    </div>
  </div>

  <div class="items-header" style="margin-top:20px;">
    <div style="flex:4;">Items</div>
    <div style="flex:1;text-align:center;">Qty</div>
    <div style="flex:1;text-align:right;">Rate</div>
    <div style="flex:1;text-align:right;">Amount</div>
  </div>

  {{#items}}
  <div class="item-row">
    <div style="flex:4;">{{name}}</div>
    <div style="flex:1;text-align:center;">{{qty}}</div>
    <div style="flex:1;text-align:right;">{{rate}}</div>
    <div style="flex:1;text-align:right;">{{amount}}</div>
  </div>
  {{/items}}

  <div class="summary">
    <div class="summary-line">
      <div>Sub Total</div>
      <div>{{subTotal}}</div>
    </div>
    <div class="summary-line">
      <div>Delivery Cost</div>
      <div>{{DeliveryAmmount}}</div>
    </div>
    <div class="summary-line">
      <div>Discount</div>
      <div>{{DiscountAmount}}</div>
    </div>
    <div class="summary-line total">
      <div>Total</div>
      <div>{{total}}</div>
    </div>
  </div>

</div>

</body>
</html>
`
}

module.exports = orderInvoice