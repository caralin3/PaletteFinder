// Actions
interface HideFooterAction {
  payload: boolean;
  type: 'HIDE_FOOTER';
}

export const hideFooter = (hide: boolean): HideFooterAction => ({
  payload: hide,
  type: 'HIDE_FOOTER'
});

interface HideHeaderAction {
  payload: boolean;
  type: 'HIDE_HEADER';
}

export const hideHeader = (hide: boolean): HideHeaderAction => ({
  payload: hide,
  type: 'HIDE_HEADER'
});

interface ToggleDrawerAction {
  payload: boolean;
  type: 'TOGGLE_DRAWER';
}

export const toggleDrawer = (open: boolean): ToggleDrawerAction => ({
  payload: open,
  type: 'TOGGLE_DRAWER'
});

type ActionTypes = HideFooterAction | HideHeaderAction | ToggleDrawerAction;

// Reducer
export interface LayoutState {
  drawerOpen: boolean;
  hideFooter: boolean;
  hideHeader: boolean;
}

const initialState: LayoutState = {
  drawerOpen: false,
  hideFooter: false,
  hideHeader: false
};

export const reducer = (
  state: LayoutState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: action.payload
      };
    case 'HIDE_FOOTER':
      return {
        ...state,
        hideFooter: action.payload
      };
    case 'HIDE_HEADER':
      return {
        ...state,
        hideHeader: action.payload
      };
    default:
      return state;
  }
};