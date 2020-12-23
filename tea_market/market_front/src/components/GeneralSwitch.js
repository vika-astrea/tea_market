import React from "react";
import { Route, Switch } from "react-router-dom";
import CartContainer from "../containers/CartContainer";
import DashboardContainer from "../containers/DashboardContainer";
import EndOfDemo from "../containers/EndOfDemo";
import LogInContainer from "../containers/LogInContainer";
import MainContainer from "../containers/MainContainer";
import RegisterContainer from "../containers/RegisterContainer";
import SellProductContainer from "../containers/SellProductContainer";
import SettingsContainer from "../containers/SettingsContainer";
import UniqueProductContainer from "../containers/UniqueProductContainer";
import WishlistContainer from "../containers/WishlistContainer";

export default function GeneralSwitch(props) {
  return (
    <Switch>
      <Route path="/home">
        <MainContainer type={props.type} func={props.func} />
      </Route>
      <Route exact path="/">
        <MainContainer type={props.type} func={props.func}  />
      </Route>
      <Route path="/login">
        <LogInContainer />
      </Route>
      <Route path="/register">
        <RegisterContainer />
      </Route>
      <Route path="/dash">
        <DashboardContainer />
      </Route>
      <Route path="/cart">
        <CartContainer />
      </Route>
      <Route path="/sell">
        <SellProductContainer />
      </Route>
      <Route path="/settings">
        <SettingsContainer />
      </Route>
      <Route path="/wishlist">
        <WishlistContainer />
      </Route>
      <Route path="/end">
        <EndOfDemo />
      </Route>
      <Route path="/product">
        <UniqueProductContainer  setType={props.setType} />
      </Route>
    </Switch>
  );
}
