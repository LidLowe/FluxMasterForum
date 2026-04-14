import {UserModel} from "./user.model";

export interface PostModel {
	id: number;
	thread_id: number;
	content: string;
	author: UserModel;

	//created_at: string;
	//updated_at: string;
}