import { Routes } from "@angular/router";
import {Home} from "./features/home/home";
import {ThreadList} from "./features/thread-list/thread-list";
import {ThreadDetail} from "./features/thread-detail/thread-detail";
import {NewThread} from "./features/new-thread/new-thread";
import {SignIn} from "./features/sign-in/sign-in";
import {SignUp} from "./features/sign-up/sign-up";
``

export const routes: Routes = [
	{ path: "", component: Home },
	{ path: "threads", component: ThreadList },
	{ path: "threads/:id", component: ThreadDetail },
	{ path: "new-thread", component: NewThread },
	{ path: "sign-in", component: SignIn },
	{ path: "sign-up", component: SignUp }
];
