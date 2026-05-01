// "use client";
//
// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/element/pill-tabs";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { vi } from "date-fns/locale";
// import { cn } from "@/lib/utils";
// import { z } from "zod";
// import {
//   Image as ImageIcon,
//   X,
//   Plus,
//   CalendarIcon,
//   Upload,
//   Loader2,
//   Users,
//   MapPin
// } from "lucide-react";
//
// import {
//   CreateMenuItemSchema,
//   UpdateMenuItemSchema,
//   CreateMenuSchema,
//   UpdateMenuSchema
// } from "@/schemas/menu";
// import {
//   CreateCategorySchema,
//   UpdateCategorySchema
// } from "@/schemas/category";
// import {
//   CreateTableSchema,
//   UpdateTableSchema
// } from "@/schemas/restaurant";
// import {
//   CreateInventoryItemSchema,
//   UpdateInventoryItemSchema
// } from "@/schemas/inventory";
// import {
//   CreateReservationSchema,
//   UpdateReservationSchema
// } from "@/schemas/restaurant";
// import {
//   CreatePromotionSchema,
//   UpdatePromotionSchema
// } from "@/schemas/promotion";
// import {
//   MenuItem,
//   Menu,
//   Category,
//   Table,
//   InventoryItem,
//   Reservation,
//   Promotion,
//   CategoryDataColumn,
//   IngredientDataColumn
// } from "@/lib/interfaces";
// import { FileUploadServer } from "@/components/upload/file-upload-server";
// import {
//   useGetAllTablesQuery,
//   useGetTablesQuery,
//   useGetAllUsersQuery,
//   useCreateReservationMutation,
//   useCheckAvailabilityMutation
// } from "@/state/api";
//
// export interface MenuItemFormProps {
//   mode?: "create" | "update"
//   restaurantId?: string
//   menuId?: string
//   categoryId?: string
//   initialValues?: Partial<MenuItem>
//   onSuccess?: (data: MenuItem) => void
//   onCancel?: () => void
//   title?: string
//   submitText?: string
//   isLoading?: boolean
// }
//
// export interface MenuFormProps {
//   mode?: "create" | "update"
//   restaurantId?: string
//   initialValues?: Partial<Menu>
//   onSuccess?: (data: Menu) => void
//   onCancel?: () => void
//   submitText?: string
//   isLoading?: boolean
// }
//
// export interface ReservationFormProps {
//   mode?: "create" | "update"
//   restaurantId?: string
//   initialValues?: Partial<Reservation>
//   onSuccess?: (data: Reservation) => void
//   onCancel?: () => void
//   submitText?: string
//   isLoading?: boolean
// }
//
// export interface PromotionFormProps {
//   mode?: "create" | "update"
//   restaurantId?: string
//   initialValues?: Partial<Promotion>
//   onSuccess?: (data: Promotion) => void
//   onCancel?: () => void
//   submitText?: string
//   isLoading?: boolean
// }
//
// export interface TableFormProps {
//   mode?: "create" | "update"
//   restaurantId?: string
//   initialValues?: Partial<Table>
//   onSuccess?: (data: Table) => void
//   onCancel?: () => void
//   submitText?: string
//   isLoading?: boolean
// }
//
// export interface CategoryFormProps {
//   mode?: "create" | "update"
//   initialValues?: CategoryDataColumn
//   // initialValues?: Partial<Category>
//   onSuccess?: (data: Category) => void
//   onCancel?: () => void
//   submitText?: string
//   isLoading?: boolean
// }
//
// // type Mode = "create" | "update";
//
// // interface MenuItemFormProps {
// //   mode?: Mode;
// //   restaurantId?: string;
// //   menuId?: string;
// //   initialValues?: Partial<z.infer<typeof UpdateMenuItemSchema>> & { id?: string };
// //   onSuccess?: (data: any) => void;
// //   onCancel?: () => void;
// //   title?: string;
// //   submitText?: string;
// // };
//
// export function MenuItemForm({
//   mode = "create",
//   restaurantId,
//   menuId,
//   categoryId,
//   initialValues,
//   onSuccess,
//   onCancel,
//   title,
//   submitText,
//   isLoading = false
// }: MenuItemFormProps) {
//   const [allergens, setAllergens] = useState<string[]>(initialValues?.allergens || []);
//   const [dietaryInfo, setDietaryInfo] = useState<string[]>(initialValues?.dietaryInfo || []);
//   const [newAllergen, setNewAllergen] = useState("");
//   const [newDietaryInfo, setNewDietaryInfo] = useState("");
//
//   const onDrop = (acceptedFiles: File[]) => {
//     // Handle file upload here
//     console.log('Files dropped:', acceptedFiles);
//   };
//
//   const accept = {
//     'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
//   };
//
//   const multiple = false;
//   const maxFiles = 1;
//   const disabled = false;
//
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept,
//     multiple,
//     maxFiles,
//     disabled
//   });
//
//   const schema = mode === "create" ? CreateMenuItemSchema : UpdateMenuItemSchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       menu_id: menuId || initialValues?.menu_id || "",
//       category_id: categoryId || initialValues?.category_id || "",
//       name: initialValues?.name || "",
//       description: initialValues?.description || "",
//       price: initialValues?.price || 0,
//       image_url: initialValues?.image_url || "",
//       is_available: initialValues?.is_available ?? true,
//       allergens: initialValues?.allergens || [],
//       calories: initialValues?.calories || undefined,
//       dietary_info: initialValues?.dietary_info || [],
//       display_order: initialValues?.display_order || 0,
//       is_featured: initialValues?.is_featured || false,
//       preparation_time: initialValues?.preparation_time || undefined,
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       // Merge allergens and dietary_info from state
//       const submitData = {
//         ...data,
//         allergens,
//         dietary_info: dietaryInfo,
//       };
//
//       console.log("Submitting menu item:", submitData);
//
//       // Here you would call your API mutation
//       // For now, just call onSuccess with the data
//       if (onSuccess) {
//         onSuccess(submitData as MenuItem);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//
//   const addAllergen = () => {
//     if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
//       setAllergens([...allergens, newAllergen.trim()]);
//       setNewAllergen("");
//     }
//   };
//
//   const removeAllergen = (allergen: string) => {
//     setAllergens(allergens.filter(a => a !== allergen));
//   };
//
//   const addDietaryInfo = () => {
//     if (newDietaryInfo.trim() && !dietaryInfo.includes(newDietaryInfo.trim())) {
//       setDietaryInfo([...dietaryInfo, newDietaryInfo.trim()]);
//       setNewDietaryInfo("");
//     }
//   };
//
//   const removeDietaryInfo = (info: string) => {
//     setDietaryInfo(dietaryInfo.filter(i => i !== info));
//   };
//
//   return (
//     <>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex justify-end gap-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isLoading}
//             >
//               Hủy
//             </Button>
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="min-w-[120px]"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Đang xử lý...
//                 </>
//               ) : (
//                 submitText || (mode === "create" ? "Thêm món ăn" : "Cập nhật")
//               )}
//             </Button>
//           </div>
//           <div className="grid grid-cols-3 gap-6">
//             <div className="col-span-2 flex flex-col gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Thông tin món ăn</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-4">
//                   <div className="grid grid-cols-4 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="name"
//                       render={({ field }) => (
//                         <FormItem className="col-span-3">
//                           <FormLabel className="">Tên món ăn *</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Nhập tên món ăn..."
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//
//                     <FormField
//                       control={form.control}
//                       name="price"
//                       render={({ field }) => (
//                         <FormItem className="col-span-1">
//                           <FormLabel className="">Giá (VNĐ) *</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               step="1000.00"
//                               placeholder="00.00"
//                               {...field}
//                               onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-sm font-medium">Mô tả</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Mô tả chi tiết về món ăn..."
//                             // className="min-h-[120px] resize-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Hình ảnh món ăn</CardTitle>
//                 </CardHeader>
//                 <CardContent className="">
//                   <div
//                     {...getRootProps()}
//                     className={`
//                       border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
//                       ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/24'}
//                       ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
//                     `}
//                   >
//                     <input {...getInputProps()} />
//                     <Badge className="h-9 w-9 p-0 bg-muted">
//                       <Upload style={{ width: 16, height: 16 }} className="h-4 w-4 text-foreground" />
//                     </Badge>
//                     {/* <Badge className="h-9 w-9 p-0 bg-professional-indigo/24">
//                       <Upload style={{ width: 16, height: 16 }} className="h-4 w-4 text-professional-indigo" />
//                     </Badge> */}
//                     {isDragActive ? (
//                       <p className="text-lg font-medium">Drop files here...</p>
//                     ) : (
//                       <div>
//                         <p className="text-lg font-medium">
//                           Drag & drop files here, or click to select
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {multiple ? `Up to ${maxFiles} files` : 'Single file only'}
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           Max size: 10MB per file
//                         </p>
//                       </div>
//                     )}
//
//                     {form.watch("image_url") && (
//                       <div className="mt-4">
//                         <Label className="text-sm font-medium">URL hình ảnh</Label>
//                         <Input
//                           value={form.watch("image_url")}
//                           readOnly
//                           className="mt-1"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Nguyên liệu</CardTitle>
//                 </CardHeader>
//               </Card>
//             </div>
//             <div className="col-span-1 flex flex-col gap-6">
//               <Card>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="is_available"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Có sẵn</FormLabel>
//                           <FormDescription>
//                             Món ăn có thể được đặt hàng
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent>
//                   <FormField
//                     control={form.control}
//                     name="is_featured"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Nổi bật</FormLabel>
//                           <FormDescription>
//                             Hiển thị món ăn ở vị trí nổi bật
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Thuộc tính</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-4">
//                   <FormField
//                     control={form.control}
//                     name="menu_id"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="">Menu *</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger className="w-full">
//                               <SelectValue placeholder="Chọn menu" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {/* TODO: Load menus from API */}
//                             <SelectItem value="menu-1">Menu Chính</SelectItem>
//                             <SelectItem value="menu-2">Menu Tráng Miệng</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   <FormField
//                     control={form.control}
//                     name="category_id"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="">Danh mục</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl className="flex">
//                             <SelectTrigger className="w-full">
//                               <SelectValue placeholder="Chọn danh mục (tùy chọn)" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {/* TODO: Load categories from API */}
//                             <SelectItem value="cat-1">Món chính</SelectItem>
//                             <SelectItem value="cat-2">Khai vị</SelectItem>
//                             <SelectItem value="cat-3">Tráng miệng</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Kích thước</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <FormField
//                       control={form.control}
//                       name="preparation_time"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium">Thời gian chuẩn bị (phút)</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="15"
//                               {...field}
//                               onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//
//                     <FormField
//                       control={form.control}
//                       name="display_order"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-sm font-medium">Thứ tự hiển thị</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="0"
//                               {...field}
//                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Giá trị</CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-4">
//                   <FormField
//                     control={form.control}
//                     name="calories"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-sm font-medium">Calories (kcal)</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="Nhập số calories..."
//                             {...field}
//                             onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   {/* Allergens */}
//                   <div className="flex flex-col gap-2">
//                     <Label className="text-sm font-medium">Chất gây dị ứng</Label>
//                     <div className="flex gap-4">
//                       <Input
//                         placeholder="Thêm chất gây dị ứng..."
//                         value={newAllergen}
//                         onChange={(e) => setNewAllergen(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergen())}
//                         className="flex-1"
//                       />
//                       <Button type="button" onClick={addAllergen} size="icon">
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     {/* <div className="flex flex-wrap gap-2">
//                       {allergens.map((allergen, index) => (
//                         <Badge key={index} variant="secondary" className="flex items-center gap-1">
//                           {allergen}
//                           <X
//                             className="h-3 w-3 cursor-pointer hover:text-red-500"
//                             onClick={() => removeAllergen(allergen)}
//                           />
//                         </Badge>
//                       ))}
//                     </div> */}
//                   </div>
//
//                   {/* Dietary Information */}
//                   <div className="flex flex-col gap-2">
//                     <Label className="text-sm font-medium">Thông tin dinh dưỡng</Label>
//                     <div className="flex gap-4">
//                       <Input
//                         placeholder="Thêm thông tin dinh dưỡng..."
//                         value={newDietaryInfo}
//                         onChange={(e) => setNewDietaryInfo(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDietaryInfo())}
//                         className="flex-1"
//                       />
//                       <Button type="button" onClick={addDietaryInfo} size="icon">
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     {/* <div className="flex flex-wrap gap-2">
//                       {dietaryInfo.map((info, index) => (
//                         <Badge key={index} variant="outline" className="flex items-center gap-1">
//                           {info}
//                           <X
//                             className="h-3 w-3 cursor-pointer hover:text-red-500"
//                             onClick={() => removeDietaryInfo(info)}
//                           />
//                         </Badge>
//                       ))}
//                     </div> */}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// }
//
// export function MenuForm({
//   mode = "create",
//   restaurantId,
//   initialValues,
//   onSuccess,
//   onCancel,
//   submitText,
//   isLoading = false
// }: MenuFormProps) {
//   const schema = mode === "create" ? CreateMenuSchema : UpdateMenuSchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       restaurant_id: "4ac60dce-ce60-4df4-a950-3585cbef426f",
//       name: initialValues?.name || "",
//       description: initialValues?.description || "",
//       is_active: initialValues?.is_active ?? true,
//       display_order: initialValues?.display_order || 0,
//       image_url: undefined,
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       console.log("Submitting menu:", data);
//
//       // Here you would call your API mutation
//       // For now, just call onSuccess with the data
//       if (onSuccess) {
//         onSuccess(data as Menu);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="flex justify-end gap-4 mb-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//           >
//             Hủy
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="min-w-[120px]"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Đang xử lý...
//               </>
//             ) : (
//               submitText || (mode === "create" ? "Thêm menu" : "Cập nhật")
//             )}
//           </Button>
//         </div>
//
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 flex flex-col gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thông tin menu</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="">Tên menu *</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Nhập tên menu..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Mô tả</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Mô tả chi tiết về menu..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             {/*<Card>*/}
//             {/*  <CardHeader>*/}
//             {/*    <CardTitle>Hình ảnh menu</CardTitle>*/}
//             {/*  </CardHeader>*/}
//             {/*  <CardContent className="">*/}
//             {/*    <FormField*/}
//             {/*      control={form.control}*/}
//             {/*      name="image_url"*/}
//             {/*      render={({ field }) => (*/}
//             {/*        <FormItem>*/}
//             {/*          <FormLabel className="text-sm font-medium">URL hình ảnh</FormLabel>*/}
//             {/*          <FormControl>*/}
//             {/*            <Input*/}
//             {/*              placeholder="https://example.com/image.jpg"*/}
//             {/*              {...field}*/}
//             {/*            />*/}
//             {/*          </FormControl>*/}
//             {/*          <FormMessage />*/}
//             {/*        </FormItem>*/}
//             {/*      )}*/}
//             {/*    />*/}
//             {/*  </CardContent>*/}
//             {/*</Card>*/}
//           </div>
//
//           <div className="col-span-1 flex flex-col gap-6">
//             <Card>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="is_active"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Hoạt động</FormLabel>
//                         <FormDescription>
//                           Menu có thể được sử dụng
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             {/*<Card>*/}
//             {/*  <CardHeader>*/}
//             {/*    <CardTitle>Cài đặt hiển thị</CardTitle>*/}
//             {/*  </CardHeader>*/}
//             {/*  <CardContent className="flex flex-col gap-4">*/}
//             {/*    <FormField*/}
//             {/*      control={form.control}*/}
//             {/*      name="display_order"*/}
//             {/*      render={({ field }) => (*/}
//             {/*        <FormItem>*/}
//             {/*          <FormLabel className="text-sm font-medium">Thứ tự hiển thị</FormLabel>*/}
//             {/*          <FormControl>*/}
//             {/*            <Input*/}
//             {/*              type="number"*/}
//             {/*              placeholder="0"*/}
//             {/*              {...field}*/}
//             {/*              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}*/}
//             {/*            />*/}
//             {/*          </FormControl>*/}
//             {/*          <FormMessage />*/}
//             {/*        </FormItem>*/}
//             {/*      )}*/}
//             {/*    />*/}
//             {/*  </CardContent>*/}
//             {/*</Card>*/}
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
//
//
//
// export function ReservationForm({
//   mode = "create",
//   restaurantId,
//   initialValues,
//   onSuccess,
//   onCancel,
//   submitText,
//   isLoading = false
// }: ReservationFormProps) {
//   // Clerk user hook
//   const { user } = {
//     user: {
//       fullName: "",
//       firstName: "",
//       lastName: "",
//       irstName: "",
//       astName: "",
//       primaryEmailAddress: "",
//     }
//   };
//
//   // RTK Query hooks
//   const [createReservation, { isLoading: isCreatingReservation }] = useCreateReservationMutation();
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     initialValues?.reservationDate ? new Date(initialValues.reservationDate) : undefined
//   );
//   const [selectedTime, setSelectedTime] = useState("");
//   const [guestCount, setGuestCount] = useState("");
//
//   const timeSlots = [
//     "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
//     "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
//     "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
//     "20:00", "20:30", "21:00", "21:30"
//   ];
//
//   const schema = mode === "create" ? CreateReservationSchema : UpdateReservationSchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       restaurantId: restaurantId || initialValues?.restaurantId || "",
//       tableId: initialValues?.tableId ?? null,
//       customerId: initialValues?.customerId ?? undefined,
//       customerName: initialValues?.customerName || user?.fullName || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "") || "",
//       customerPhone: initialValues?.customerPhone || "",
//       customerEmail: initialValues?.customerEmail || user?.primaryEmailAddress?.emailAddress || undefined,
//       partySize: initialValues?.partySize || 2,
//       // reservationDate: initialValues?.reservationDate ? new Date(initialValues.reservationDate) : undefined, // Remove this - will be set in onSubmit
//       durationHours: initialValues?.durationHours || 2,
//       specialRequests: initialValues?.specialRequests || "",
//       notes: initialValues?.notes || "",
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       if (!data.restaurantId) {
//         console.error("Restaurant is required");
//         return;
//       }
//
//       // Combine date and time into a single Date object
//       let reservationDateTime: Date | undefined;
//       if (selectedDate && selectedTime) {
//         // Create date string in YYYY-MM-DD format
//         const dateStr = selectedDate.toISOString().split('T')[0];
//         // Combine date and time: "2025-10-02T08:00:00"
//         const dateTimeStr = `${dateStr}T${selectedTime}:00`;
//         reservationDateTime = new Date(dateTimeStr);
//         console.log('Combined date and time:', { dateStr, selectedTime, dateTimeStr, reservationDateTime });
//       }
//
//       // Prepare data for submission
//       const reservationData = {
//         ...data,
//         reservationDate: reservationDateTime,
//         // customerId: data.customerId || undefined,
//       };
//
//       console.log("Submitting reservation:", reservationData);
//
//       // Use RTK Query mutation
//       const result = await createReservation(reservationData).unwrap();
//
//       if (onSuccess) {
//         onSuccess(result);
//       }
//     } catch (error) {
//       console.error("Error submitting reservation:", error);
//       // Error handling will be done by RTK Query toast
//     }
//   };
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/*<div className="flex justify-end gap-4 mb-6">*/}
//         {/*  <Button*/}
//         {/*    type="button"*/}
//         {/*    variant="outline"*/}
//         {/*    onClick={onCancel}*/}
//         {/*    disabled={isLoading}*/}
//         {/*  >*/}
//         {/*    Hủy*/}
//         {/*  </Button>*/}
//         {/*  <Button*/}
//         {/*    type="submit"*/}
//         {/*    disabled={isLoading || isCreatingReservation || (selectedTable && !isTableAvailable)}*/}
//         {/*    className="min-w-[120px]"*/}
//         {/*  >*/}
//         {/*    {isLoading || isCreatingReservation ? (*/}
//         {/*      <>*/}
//         {/*        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>*/}
//         {/*        Đang xử lý...*/}
//         {/*      </>*/}
//         {/*    ) : (*/}
//         {/*      submitText || (mode === "create" ? "Tạo đặt bàn" : "Cập nhật đặt bàn")*/}
//         {/*    )}*/}
//         {/*  </Button>*/}
//         {/*</div>*/}
//
//         <Card>
//           <CardHeader>
//             <CardTitle>Thông tin đặt bàn</CardTitle>
//             <CardDescription>
//               Vui lòng điền đầy đủ thông tin để đặt bàn
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Thông tin khách hàng */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="customerName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Họ và tên *</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Nhập họ và tên"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//
//               <FormField
//                 control={form.control}
//                 name="customerPhone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Số điện thoại *</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Nhập số điện thoại"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//
//             <FormField
//               control={form.control}
//               name="customerEmail"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Nhập email (tùy chọn)"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//
//             {/*<FormField*/}
//             {/*  control={form.control}*/}
//             {/*  name="customerEmail"*/}
//             {/*  render={({ field }) => (*/}
//             {/*    <FormItem>*/}
//             {/*      <FormLabel>Email khách hàng</FormLabel>*/}
//             {/*      <FormControl>*/}
//             {/*        <Input*/}
//             {/*          {...field}*/}
//             {/*          value={field.value || ""}*/}
//             {/*          placeholder="Email khách hàng"*/}
//             {/*        />*/}
//             {/*      </FormControl>*/}
//             {/*      <FormMessage />*/}
//             {/*    </FormItem>*/}
//             {/*  )}*/}
//             {/*/>*/}
//
//             {/* Thông tin khách hàng từ Clerk */}
//             {/*<FormField*/}
//             {/*  control={form.control}*/}
//             {/*  name="customerName"*/}
//             {/*  render={({ field }) => (*/}
//             {/*    <FormItem>*/}
//             {/*      <FormLabel>Tên khách hàng</FormLabel>*/}
//             {/*      <FormControl>*/}
//             {/*        <Input*/}
//             {/*          {...field}*/}
//             {/*          value={field.value || ""}*/}
//             {/*          placeholder="Tên khách hàng"*/}
//             {/*        />*/}
//             {/*      </FormControl>*/}
//             {/*      <FormMessage />*/}
//             {/*    </FormItem>*/}
//             {/*  )}*/}
//             {/*/>*/}
//
//             {/* Ngày và giờ */}
//             <div className="grid md:grid-cols-5 gap-4">
//               <div className="col-span-2 space-y-2">
//
//                 {/*<Label>Ngày đặt bàn *</Label>*/}
//                 {/*<Popover>*/}
//                 {/*  <PopoverTrigger asChild>*/}
//                 {/*    <Button variant="outline" className="w-full justify-start">*/}
//                 {/*      <CalendarIcon className="mr-2 h-4 w-4" />*/}
//                 {/*      {selectedDate ? (*/}
//                 {/*        format(selectedDate, "dd/MM/yyyy", { locale: vi })*/}
//                 {/*      ) : (*/}
//                 {/*        "Chọn ngày"*/}
//                 {/*      )}*/}
//                 {/*    </Button>*/}
//                 {/*  </PopoverTrigger>*/}
//                 {/*  <PopoverContent className="w-auto p-0">*/}
//                 {/*    <Calendar*/}
//                 {/*      mode="single"*/}
//                 {/*      selected={selectedDate}*/}
//                 {/*      onSelect={(date) => {*/}
//                 {/*        setSelectedDate(date);*/}
//                 {/*        if (date) {*/}
//                 {/*          form.setValue("reservationDate", date);*/}
//                 {/*        }*/}
//                 {/*      }}*/}
//                 {/*      disabled={(date) => date < new Date()}*/}
//                 {/*      initialFocus*/}
//                 {/*    />*/}
//                 {/*  </PopoverContent>*/}
//                 {/*</Popover>*/}
//
//                 <FormField
//                   control={form.control}
//                   name="reservationDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Ngày đặt bàn</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="date"
//                           value={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
//                           onChange={(e) => {
//                             const dateString = e.target.value;
//                             const date = dateString ? new Date(dateString) : undefined;
//                             console.log('Date input change:', { dateString, date });
//                             setSelectedDate(date);
//                             form.setValue("reservationDate", date, { shouldValidate: true });
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//
//               <div className="col-span-1 space-y-2">
//                 <Label>Giờ đặt bàn *</Label>
//                 <Select value={selectedTime} onValueChange={setSelectedTime} required>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Chọn giờ" />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-60">
//                     {timeSlots.map((time) => (
//                       <SelectItem key={time} value={time}>
//                         {time}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//
//               <div className="col-span-1 space-y-2">
//                 <Label>Số người *</Label>
//                 <Select value={guestCount} onValueChange={(value) => {
//                   setGuestCount(value);
//                   form.setValue("partySize", parseInt(value));
//                 }} required>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Chọn số người" />
//                   </SelectTrigger>
//                   <SelectContent className="max-h-60">
//                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
//                       <SelectItem key={num} value={num.toString()}>
//                         {num} người
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//
//             </div>
//
//             {/* Yêu cầu đặc biệt */}
//             <FormField
//               control={form.control}
//               name="notes"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Yêu cầu đặc biệt</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Ví dụ: Sinh nhật, kỷ niệm, dị ứng thực phẩm..."
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//
//             <Button
//               type="submit"
//               className="w-full"
//               size="lg"
//               disabled={isLoading}
//               onClick={() => console.log('Form values:', form.getValues())}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Đang xử lý...
//                 </>
//               ) : (
//                 "Xác nhận đặt bàn"
//               )}
//             </Button>
//           </CardContent>
//         </Card>
//       </form>
//     </Form>
//   );
// }
//
// export function PromotionForm({
//   mode = "create",
//   restaurantId,
//   initialValues,
//   onSuccess,
//   onCancel,
//   submitText,
//   isLoading = false
// }: PromotionFormProps) {
//   const schema = mode === "create" ? CreatePromotionSchema : UpdatePromotionSchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       restaurant_id: restaurantId || initialValues?.restaurant_id || "",
//       name: initialValues?.name || "",
//       description: initialValues?.description || "",
//       type: initialValues?.type || "percentage",
//       discount_value: initialValues?.discount_value || 0,
//       conditions: initialValues?.conditions ? JSON.stringify(initialValues.conditions, null, 2) : "",
//       applicable_items: initialValues?.applicable_items || [],
//       time_restrictions: initialValues?.time_restrictions ? JSON.stringify(initialValues.time_restrictions, null, 2) : "",
//       start_date: initialValues?.start_date ? new Date(initialValues.start_date) : undefined,
//       end_date: initialValues?.end_date ? new Date(initialValues.end_date) : undefined,
//       is_active: initialValues?.is_active ?? true,
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       // Convert date strings to Date objects and parse JSON fields
//       const processedData = {
//         ...data,
//         start_date: data.start_date,
//         end_date: data.end_date,
//         applicable_items: (() => {
//           if (Array.isArray(data.applicable_items)) {
//             return data.applicable_items;
//           }
//           if (typeof data.applicable_items === 'string') {
//             return data.applicable_items.split(',').map((id: string) => id.trim()).filter(Boolean);
//           }
//           return [];
//         })(),
//         conditions: data.conditions ? JSON.parse(data.conditions as string) : undefined,
//         time_restrictions: data.time_restrictions ? JSON.parse(data.time_restrictions as string) : undefined,
//       };
//
//       console.log("Submitting promotion:", processedData);
//
//       // Here you would call your API mutation
//       // For now, just call onSuccess with the data
//       if (onSuccess) {
//         onSuccess(processedData as any);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex justify-end gap-4 mb-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//           >
//             Hủy
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="min-w-[120px]"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Đang xử lý...
//               </>
//             ) : (
//               submitText || (mode === "create" ? "Tạo khuyến mãi" : "Cập nhật khuyến mãi")
//             )}
//           </Button>
//         </div>
//
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 flex flex-col gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thông tin cơ bản</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Tên khuyến mãi</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Ví dụ: Giảm giá 20% cho combo" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Mô tả</FormLabel>
//                       <FormControl>
//                         <Textarea placeholder="Mô tả chi tiết về khuyến mãi..." {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="type"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Loại khuyến mãi</FormLabel>
//                         <FormControl>
//                           <Select value={field.value} onValueChange={field.onChange}>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Chọn loại" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="percentage">Phần trăm (%)</SelectItem>
//                               <SelectItem value="fixed_amount">Số tiền cố định</SelectItem>
//                               <SelectItem value="buy_one_get_one">Mua 1 tặng 1</SelectItem>
//                               <SelectItem value="combo_deal">Combo</SelectItem>
//                               <SelectItem value="happy_hour">Giờ vàng</SelectItem>
//                               <SelectItem value="seasonal">Theo mùa</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   <FormField
//                     control={form.control}
//                     name="discount_value"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Giá trị giảm</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             placeholder="0.00"
//                             {...field}
//                             onChange={(e) => field.onChange(Number(e.target.value))}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thời gian áp dụng</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={form.control}
//                     name="start_date"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Ngày bắt đầu</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="date"
//                             {...field}
//                             value={field.value ? field.value.toISOString().split('T')[0] : ''}
//                             onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   <FormField
//                     control={form.control}
//                     name="end_date"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Ngày kết thúc</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="date"
//                             {...field}
//                             value={field.value ? field.value.toISOString().split('T')[0] : ''}
//                             onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Điều kiện áp dụng (JSON)</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="conditions"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Điều kiện (JSON format)</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder={`{
//   "min_order_value": 100000,
//   "min_quantity": 2,
//   "customer_type": "vip",
//   "order_type": "dine_in"
// }`}
//                           className="font-mono text-sm"
//                           rows={6}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Định nghĩa điều kiện áp dụng khuyến mãi dưới dạng JSON. Có thể bao gồm: min_order_value, min_quantity, customer_type, order_type, etc.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Giới hạn thời gian (JSON)</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="time_restrictions"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Giới hạn thời gian (JSON format)</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder={`{
//   "start_time": "17:00",
//   "end_time": "21:00",
//   "days_of_week": [1, 2, 3, 4, 5],
//   "exclude_holidays": false
// }`}
//                           className="font-mono text-sm"
//                           rows={6}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Định nghĩa giới hạn thời gian áp dụng khuyến mãi dưới dạng JSON. Có thể bao gồm: start_time, end_time, days_of_week, exclude_holidays.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//
//           <div className="col-span-1 flex flex-col gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Trạng thái</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="is_active"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center space-x-3 space-y-0">
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                       <div className="space-y-1 leading-none">
//                         <FormLabel>Kích hoạt</FormLabel>
//                         <FormDescription>
//                           Khuyến mãi có đang hoạt động hay không
//                         </FormDescription>
//                       </div>
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Áp dụng cho</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="applicable_items"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>ID món ăn (cách nhau bởi dấu phẩy)</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="uuid1, uuid2, uuid3"
//                           {...field}
//                           value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Để trống để áp dụng cho tất cả món ăn, hoặc nhập ID các món ăn cụ thể.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
//
// export function TableForm({
//   mode = "create",
//   restaurantId,
//   initialValues,
//   onSuccess,
//   onCancel,
//   submitText,
//   isLoading = false
// }: TableFormProps) {
//   const schema = mode === "create" ? CreateTableSchema : UpdateTableSchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       restaurant_id: restaurantId || initialValues?.restaurant_id || "",
//       table_number: initialValues?.table_number || "",
//       capacity: initialValues?.capacity || 4,
//       location: initialValues?.location || "",
//       status: initialValues?.status || "available",
//       qr_code: initialValues?.qr_code || "",
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       console.log("Submitting table:", data);
//
//       // Here you would call your API mutation
//       // For now, just call onSuccess with the data
//       if (onSuccess) {
//         onSuccess(data as Table);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex justify-end gap-4 mb-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//           >
//             Hủy
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="min-w-[120px]"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Đang xử lý...
//               </>
//             ) : (
//               submitText || (mode === "create" ? "Tạo bàn" : "Cập nhật bàn")
//             )}
//           </Button>
//         </div>
//
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 flex flex-col gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thông tin bàn</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <div className="grid grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="table_number"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="">Số bàn *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="VD: A01, B05, 001"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   <FormField
//                     control={form.control}
//                     name="capacity"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-sm font-medium">Sức chứa *</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             placeholder="4"
//                             {...field}
//                             onChange={(e) => field.onChange(parseInt(e.target.value) || 4)}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//
//                 <FormField
//                   control={form.control}
//                   name="location"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Vị trí</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="VD: Tầng 1, Góc phải, Bên cửa sổ"
//                           {...field}
//                           value={field.value || ""}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Mã QR</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="qr_code"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Mã QR</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Mã QR để quét đặt bàn"
//                           {...field}
//                           value={field.value || ""}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Mã QR duy nhất cho bàn này (tùy chọn)
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//
//           <div className="col-span-1 flex flex-col gap-6">
//             <Card>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-base">Trạng thái</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Chọn trạng thái" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="available">Có sẵn</SelectItem>
//                           <SelectItem value="occupied">Đang sử dụng</SelectItem>
//                           <SelectItem value="reserved">Đã đặt</SelectItem>
//                           <SelectItem value="maintenance">Bảo trì</SelectItem>
//                           <SelectItem value="out_of_order">Hỏng</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
//
// interface DatePickerProps {
//   date?: Date;
//   onDateChange?: (date: Date | undefined) => void;
//   placeholder?: string;
// }
//
// function DatePicker({ date, onDateChange, placeholder = "Chọn ngày" }: DatePickerProps) {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className={cn(
//             "w-full justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={onDateChange}
//           // onSelect={(selectedDate) => {
//           //   // Create date in local timezone to match input[type="date"] behavior
//           //   // Convert selectedDate to YYYY-MM-DD format and parse as local date
//           //   const dateValue = selectedDate ? new Date(selectedDate.toISOString().split('T')[0]) : undefined;
//           //   onDateChange?.(dateValue);
//           // }}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }
//
// export function CategoryForm({
//   mode = "create",
//   initialValues,
//   onSuccess,
//   onCancel,
//   submitText,
//   isLoading = false
// }: CategoryFormProps) {
//   const schema = mode === "create" ? CreateCategorySchema : UpdateCategorySchema;
//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       parent_id: initialValues?.parent_id || null, // undefined instead of ""
//       name: initialValues?.name || "",
//       slug: initialValues?.slug || "",
//       description: initialValues?.description || "", // undefined instead of ""
//       // image_url: initialValues?.image_url || "",
//       image_url: undefined, // undefined instead of ""
//       // display_order: initialValues?.display_order || 0,
//       display_order: 0,
//       is_active: initialValues?.is_active ?? true,
//     },
//     mode: "onBlur"
//   });
//
//   const onSubmit = async (data: z.infer<typeof schema>) => {
//     try {
//       console.log("Submitting category:", data);
//
//       // Here you would call your API mutation
//       // For now, just call onSuccess with the data
//       if (onSuccess) {
//         onSuccess(data as Category);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="flex justify-end gap-4 mb-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//           >
//             Hủy
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="min-w-[120px]"
//           >
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Đang xử lý...
//               </>
//             ) : (
//               submitText || (mode === "create" ? "Thêm danh mục" : "Cập nhật")
//             )}
//           </Button>
//         </div>
//
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 flex flex-col gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thông tin danh mục</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <div className="grid grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="">Tên danh mục *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Nhập tên danh mục..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//
//                   <FormField
//                     control={form.control}
//                     name="slug"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="">Slug *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="ten-danh-muc"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Mô tả</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Mô tả chi tiết về danh mục..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             {/*<Card>*/}
//             {/*  <CardHeader>*/}
//             {/*    <CardTitle>Hình ảnh danh mục</CardTitle>*/}
//             {/*  </CardHeader>*/}
//             {/*  <CardContent className="">*/}
//             {/*    <FormField*/}
//             {/*      control={form.control}*/}
//             {/*      name="image_url"*/}
//             {/*      render={({ field }) => (*/}
//             {/*        <FormItem>*/}
//             {/*          <FormLabel className="text-sm font-medium">URL hình ảnh</FormLabel>*/}
//             {/*          <FormControl>*/}
//             {/*            <Input*/}
//             {/*              placeholder="https://example.com/image.jpg"*/}
//             {/*              {...field}*/}
//             {/*            />*/}
//             {/*          </FormControl>*/}
//             {/*          <FormMessage />*/}
//             {/*        </FormItem>*/}
//             {/*      )}*/}
//             {/*    />*/}
//             {/*  </CardContent>*/}
//             {/*</Card>*/}
//           </div>
//
//           <div className="col-span-1 flex flex-col gap-6">
//             <Card>
//               <CardContent>
//                 <FormField
//                   control={form.control}
//                   name="is_active"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Hoạt động</FormLabel>
//                         <FormDescription>
//                           Danh mục có thể được sử dụng
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle>Cài đặt hiển thị</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="display_order"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium">Thứ tự hiển thị</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="0"
//                           {...field}
//                           onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
