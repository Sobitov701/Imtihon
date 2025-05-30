const baseURL = import.meta.env.VITE_BASE_URL.replace(/\/$/, ""); // oxiridagi / ni olib tashlaydi

export async function getInvoices(route = "", status = "") {
  const url = `${baseURL}${route}${status ? `?status=${status}` : ""}`;

  const res = await fetch(url);
  if (res.ok) {
    const result = await res.json();
    return result.data;
  } else {
    throw new Error(`Xatolik (getInvoices): ${res.status} - ${res.statusText}`);
  }
}

export async function getInvoiceById(id) {
  const url = `${baseURL}/invoices/${id}`; // id faqat identifikator bo'lishi kerak

  const res = await fetch(url);
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error(
      `Xatolik (getInvoiceById): ${res.status} - ${res.statusText}`
    );
  }
}

export async function deleteInvoiceById(id) {
  const url = `${baseURL}/invoices/${id}`;

  const res = await fetch(url, {
    method: "DELETE",
  });

  if (res.ok) {
    return "success";
  } else {
    throw new Error(
      `Xatolik (deleteInvoiceById): ${res.status} - ${res.statusText}`
    );
  }
}

export async function addInvoice(data) {
  const url = `${baseURL}/invoices`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error(`Xatolik (addInvoice): ${res.status} - ${res.statusText}`);
  }
}

export async function updateInvoice(id, data) {
  const url = `${baseURL}/invoices/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error(
      `Xatolik (updateInvoice): ${res.status} - ${res.statusText}`
    );
  }
}
