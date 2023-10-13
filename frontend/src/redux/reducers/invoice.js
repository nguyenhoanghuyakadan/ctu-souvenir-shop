import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: null,
  success: false,
};

export const invoiceReducer = createReducer(initialState, {
  // Tạo phiếu nhập mới
  invoiceCreateRequest: (state) => {
    state.isLoading = true;
  },
  invoiceCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.invoice = action.payload;
    state.success = true;
  },
  invoiceCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Lấy danh sách phiếu nhập
  getAllInvoicesRequest: (state) => {
    state.isLoading = true;
  },
  getAllInvoicesSuccess: (state, action) => {
    state.isLoading = false;
    state.invoices = action.payload;
  },
  getAllInvoicesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Lấy danh sách phiếu nhập của shop
  getAllInvoicesShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllInvoicesShopSuccess: (state, action) => {
    state.isLoading = false;
    state.invoices = action.payload;
  },
  getAllInvoicesShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Xóa phiếu nhập
  deleteInvoiceRequest: (state) => {
    state.isLoading = true;
  },
  deleteInvoiceSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteInvoiceFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
