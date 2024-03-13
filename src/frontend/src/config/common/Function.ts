import axios from "axios";
import {BASE_URL} from "../const/Url";
import {Item} from '../../components/app/post/ItemSlug';
import {ItemsData} from "../../components/app/post/Items";
import {AdminData} from "../../components/app/admin/Profile";

export const baseApi = axios.create({
    baseURL: `${BASE_URL}./items?`
});

// export const createNoteFn = async (note: CreateNoteInput) => {
//     const response = await noteApi.post<INoteResponse>("notes/", note);
//     return response.data;
// };
//

export const getAdminData = async (id: string) => {
    const result = await baseApi.get<AdminData>(`${BASE_URL}admin/${id}/profile`);
    return result.data;
};


// export const updateNoteFn = async () => {
//     const response = await noteApi.patch<INoteResponse>(`notes/${noteId}`, note);
//     return response.data;
// };

// export const deleteNoteFn = async (noteId: string) => {
//     return noteApi.delete<null>(`notes/${noteId}`);
// };
//

export const getAdminSingleItemData = async (id: string) => {
    const result = await baseApi.get(`${BASE_URL}admin/${id}/profile`);
    return result.data;
};

export const getAllItemData = async () => {
    const response = await baseApi.get<ItemsData>(`items?`);
    return response.data;
};


export const getSingleItemData = async (slug: string) => {
    const result = await baseApi.get<Item>(`${BASE_URL}item/${slug}`);
    return result.data;
};