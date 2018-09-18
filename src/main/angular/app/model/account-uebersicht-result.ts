import {Page} from "./page";
import {AccountUebersicht} from "./account-uebersicht";

export interface AccountUebersichtResult {
    accounts: AccountUebersicht[];
    page: Page;
}
