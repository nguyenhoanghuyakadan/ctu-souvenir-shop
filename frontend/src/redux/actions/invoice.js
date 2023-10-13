import axios from "axios";
import { server } from "../../server";

// Tạo phiếu nhập mới
export const createInvoice = (newInvoiceData) => async (dispatch) => {
  try {
    dispatch({
      type: "invoiceCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/invoice/create-invoice`,
      newInvoiceData
    );
    dispatch({
      type: "invoiceCreateSuccess",
      payload: data.invoice,
    });
  } catch (error) {
    dispatch({
      type: "invoiceCreateFail",
      payload: error.response.data?.message,
    });
  }
};

// Lấy danh sách phiếu nhập
export const getAllInvoices = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllInvoicesRequest",
    });

    const { data } = await axios.get(`${server}/invoice/get-all-invoices`);
    dispatch({
      type: "getAllInvoicesSuccess",
      payload: data.invoices,
    });
  } catch (error) {
    dispatch({
      type: "getAllInvoicesFailed",
      payload: error.response.data?.message,
    });
  }
};

// Xóa phiếu nhập
// export const deleteInvoice = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteInvoiceRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/invoice/delete-invoice/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteInvoiceSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteInvoiceFailed",
//       payload: error.response.data?.message,
//     });
//   }
// };
