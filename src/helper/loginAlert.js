import Swal from "sweetalert2";

// Define your function
export async function loginAlert() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to login this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, login!"
  });
}
