// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { addNewEmployeeValidation } from "../../validations/employeeValidation";
// import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from "../../constant";
// import { getDepartmentList } from "../../services/adminService";
// import AppHeader from "../../components/AppHeader";
// import AppSidebar from "../../components/AppSidebar";
// import SelectField from "../../components/formField/SelectField";
// import InputField from "../../components/formField/InputField";
// import UploadFile from "../../components/formField/UploadFile";

// // export type FormData = z.infer<typeof addNewEmployeeValidation>;

// const AddNewEmployee: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [options, setOptions] = useState({
//     departments: [],
//     designations: [],
//     roles: [],
//     reportingManagers: [],
//   });

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormData>({
//     mode: "onBlur",
//     resolver: zodResolver(addNewEmployeeValidation),
//   });

//   const onSubmit = (data: FormData) => {
//     console.log("Submitted Data: ", data);
//   };

//   const getDepartmentOptions = () => {
//     getDepartmentList().then(({ data: response }) => {
//       if (response && response?.success && response?.data) {
//         const res = response?.data[0] as any;
//         console.log("res", res);
//         setOptions({
//           departments: res.departments,
//           designations: res.designations,
//           roles: res.roles,
//           reportingManagers: res.reportingManagers,
//         });
//       }
//     });
//   };

//   React.useEffect(() => {
//     getDepartmentOptions();
//   }, []);

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <AppSidebar 
//         sidebarOpen={sidebarOpen} 
//         setSidebarOpen={setSidebarOpen} 
//       />
      
//       {/* Main Content Area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         {/* Header */}
//         <AppHeader 
//           sidebarOpen={sidebarOpen} 
//           setSidebarOpen={setSidebarOpen} 
//         />
        
//         {/* Main Content */}
//         <main className="flex-grow p-8 bg-gray-100">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="bg-white p-6 rounded-lg shadow-md space-y-8"
//           >
//             <h2 className="text-xl font-semibold">Personal Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <UploadFile
//                 label="Profile Picture"
//                 name="profile_picture"
//                 control={control}
//                 error={errors.profile_picture?.message}
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="First Name"
//                 name="first_name"
//                 control={control}
//                 placeholder="Enter First Name"
//                 error={errors.first_name?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="Last Name"
//                 name="last_name"
//                 control={control}
//                 placeholder="Enter Last Name"
//                 error={errors.last_name?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="Personal Email Address"
//                 name="email"
//                 control={control}
//                 placeholder="e.g., john@example.com"
//                 error={errors.email?.message}
//                 type="email"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="Phone"
//                 name="phone"
//                 control={control}
//                 placeholder="Enter Phone Number"
//                 error={errors.phone?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="Date of Birth"
//                 name="dob"
//                 control={control}
//                 placeholder="Select Date"
//                 error={errors.dob?.message}
//                 requiredLabel={true}
//               />

//               <SelectField
//                 label="Marital Status"
//                 control={control}
//                 name="marital_status"
//                 options={MARITAL_STATUS_OPTIONS}
//                 requiredLabel={true}
//                 error={errors.marital_status?.message}
//               />
              
//               <SelectField
//                 label="Gender"
//                 control={control}
//                 name="gender"
//                 options={GENDER_OPTIONS}
//                 requiredLabel={true}
//                 error={errors.gender?.message}
//               />
//             </div>

//             <h2 className="text-xl font-semibold">Professional Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <InputField
//                 label="Employee Email Address"
//                 name="email"
//                 control={control}
//                 placeholder="e.g., john@example.com"
//                 error={errors.email?.message}
//                 type="email"
//                 requiredLabel={true}
//               />
//               <SelectField
//                 label="Department"
//                 name="department"
//                 control={control}
//                 options={options.departments||[]}
//                 error={errors.department?.message}
//                 requiredLabel={true}
//               />
//               <SelectField
//                 label="Reporting Manager"
//                 name="reporting_manager"
//                 control={control}
//                 options={options.reportingManagers||[]}
//                 error={errors.reporting_manager?.message}
//                 requiredLabel={true}
//               />

//               <SelectField
//                 label="Designation"
//                 name="designation"
//                 control={control}
//                 options={options.designations||[]}
//                 error={errors.designation?.message}
//                 requiredLabel={true}
//               />   
//             </div>

//             <h2 className="text-xl font-semibold">Address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <InputField
//                 label="Address"
//                 name="address"
//                 control={control}
//                 placeholder="Enter Address"
//                 error={errors.address?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="City"
//                 name="city"
//                 control={control}
//                 placeholder="Enter City"
//                 error={errors.city?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="State"
//                 name="state"
//                 control={control}
//                 placeholder="Enter State"
//                 error={errors.state?.message}
//                 type="text"
//                 requiredLabel={true}
//               />

//               <InputField
//                 label="Zip Code"
//                 name="zipcode"
//                 control={control}
//                 placeholder="Enter Zipcode"
//                 error={errors.pincode?.message}
//                 type="text"
//                 requiredLabel={true}
//               />
//             </div>

//             <div className="flex justify-between mt-8">
//               <button
//                 type="submit"
//                 className="bg-black text-white px-6 py-2 rounded-lg"
//               >
//                 Save as Draft
//               </button>

//               <button type="button" className="text-gray-500 px-6 py-2 rounded-lg">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddNewEmployee;