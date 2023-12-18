import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";

function ConfirmPaymentForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send payment data to server).
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="6">
          <h3>Payment Information</h3>
          <form onSubmit={handleSubmit}>
            {/* Credit card details */}
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                required
              />
            </div>
            {/* Other payment fields */}
            {/* ... */}
            {/* Payment button */}
            <div className="mb-3">
              <MDBBtn type="submit" color="primary">
                Make Payment
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default PaymentForm;
