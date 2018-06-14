import { Action } from "redux";


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const CHANGE_PAGE = "CHANGE_PAGE";
export type CHANGE_PAGE = typeof CHANGE_PAGE;
export interface IChangePageAction extends Action {
    type: CHANGE_PAGE,
    currentPage: string,
}

export const REDIRECT_PAGE = "REDIRECT_PAGE";
export type REDIRECT_PAGE = typeof REDIRECT_PAGE;
export interface IRedirectPageAction extends Action {
    type: REDIRECT_PAGE,
    redirectTarget: string,
    history: any,
}

export const RESET_TARGET_PAGE = "RESET_TARGET_PAGE";
export type RESET_TARGET_PAGE = typeof RESET_TARGET_PAGE;
export interface IRestTargetPageAction extends Action {
    type: RESET_TARGET_PAGE,
}


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type UserActions =
    IChangePageAction |
    IRedirectPageAction |
    IRestTargetPageAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function changePage(currentPage: string): IChangePageAction {
    return {
        type: CHANGE_PAGE,
        currentPage,
    }
}

export function redirectPage(redirectTarget: string, history: any): IRedirectPageAction {
    return {
        type: REDIRECT_PAGE,
        redirectTarget,
        history,
    }
}

export function resetTargetPage(): IRestTargetPageAction {
    return {
        type: RESET_TARGET_PAGE,
    }
}