import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => {
        return {
          url: `/user/details`,
          method: "GET",
        };
      },
    }),
    getAllUsers: build.query({
      query: () => {
        return {
          url: `/user/all-users`,
          method: "GET",
        };
      },
    }),

    // Vehicles
    getAllVehicles: build.query({
      query: () => {
        return {
          url: `/vehicle/`,
          method: "GET",
        };
      },
    }),
    getVehicle: build.query({
      query: (val) => {
        // const { id } = val
        console.log("-----------", val);
        // console.log(id)
        return {
          url: `/vehicle/${val}`,
          method: "GET",
        };
      },
    }),
    getVehicleOwner: build.query({
      query: (val) => {
        return {
          url: `/vehicle/owned`,
          method: "GET",
        };
      },
    }),
    createVehicle: build.query({
      query: (val) => {
        console.log(val);
        const {
          image,
          licensePlate,
          price,
          extraFee,
          type,
          make,
          model,
          feature,
          description,

          powers,
          fuelType,
          insurance,
          consumption,
          maxSpeed,
        } = val;
        return {
          url: `/vehicle/`,
          method: "POST",
          body: {
            image,
            licensePlate,
            price,
            extraFee,
            type,
            make,
            model,
            feature,
            description,

            powers,
            fuelType,
            insurance,
            consumption,
            maxSpeed,
          },
        };
      },
    }),
    updateVehicle: build.query({
      query: (val) => {
        const { id, image, price, extraFee, feature, description } = val;
        return {
          url: `/vehicle/${id}`,
          method: "PATCH",
          body: {
            image,
            price,
            extraFee,
            feature,
            description,
          },
        };
      },
    }),
    deleteVehicle: build.query({
      query: (val) => {
        return {
          url: `/vehicle/${val}`,
          method: "DELETE",
        };
      },
    }),

    // Order
    getAllOrders: build.query({
      query: () => {
        return {
          url: `/order/all-orders`,
          method: "GET",
        };
      },
    }),
    requestOrder: build.query({
      query: (val) => {
        console.log(val);
        const {
          vehicleID,
          from,
          to,
          totalTime,
          total,
          address,
          serviceType,
          clientRequire,
        } = val;
        return {
          url: `/order/requestOrder`,
          method: "POST",
          body: {
            vehicleID,
            from,
            to,
            totalTime,
            total,
            address,
            serviceType,
            clientRequire,
          },
        };
      },
    }),
    updateOrder: build.query({
      query: (val) => {
        const {
          vehicleID,
          from,
          to,
          totalTime,
          total,
          address,
          serviceType,
          clientRequire,
          orderID,
        } = val;
        return {
          url: `/order/updateOrder`,
          method: "PATCH",
          body: {
            vehicleID,
            from,
            to,
            totalTime,
            total,
            address,
            serviceType,
            clientRequire,
            orderID,
          },
        };
      },
    }),
    deleteOrder: build.query({
      query: (val) => {
        const { vehicleID, orderID } = val;
        return {
          url: `/order/deleteOrder`,
          method: "DELETE",
          body: {
            vehicleID,
            orderID,
          },
        };
      },
    }),
    responseOrder: build.query({
      query: (val) => {
        const { vehicleID, orderID, isAvailable, isCompleted } = val;
        return {
          url: `/order/responseOrder`,
          method: "POST",
          body: {
            vehicleID,
            orderID,
            isAvailable,
            isCompleted,
          },
        };
      },
    }),

    // Review
    getReview: build.query({
      query: (val) => {
        const { contentID } = val;
        return {
          url: `/review/${contentID}`,
          method: "GET",
        };
      },
    }),
    postReview: build.query({
      query: (val) => {
        const { type, typeID, rate, content } = val;
        return {
          url: `/review`,
          method: "POST",
          body: { type, typeID, rate, content },
        };
      },
    }),
    editReview: build.query({
      query: (val) => {
        const { id } = val;
        return {
          url: `/review`,
          method: "PATCH",
        };
      },
    }),
    deleteReview: build.query({
      query: (val) => {
        const { id } = val;
        return {
          url: `/review`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,

  //Vehicle
  useGetAllVehiclesQuery,
  useGetVehicleQuery,
  useCreateVehicleQuery,
  useUpdateVehicleQuery,
  useDeleteVehicleQuery,
  useGetVehicleOwnerQuery,
  //Order
  useGetAllOrdersQuery,
  // useRe
  useRequestOrderQuery,
  useUpdateOrderQuery,
  useDeleteOrderQuery,
  useResponseOrderQuery,

  //Review
  useGetReviewQuery,
  usePostReviewQuery,
  useEditReviewQuery,
  useDeleteReviewQuery,
} = userApiSlice;
