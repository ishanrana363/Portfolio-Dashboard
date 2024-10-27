import Swal from "sweetalert2";

// Define your function
export async function createAlert() {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to create this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, create it!"
  });
}
