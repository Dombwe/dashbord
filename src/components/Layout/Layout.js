import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Dashboard from "../../pages/dashboard";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

// pages
import Typography from "../../pages/typography";
import Maps from "../../pages/maps";
import Notifications from "../../pages/notifications/Notifications";
import Icons from "../../pages/icons";
import Tables from "../../pages/tables";
import Charts from "../../pages/charts";


// Administration
// import Administrator from "../../administration/administrator/Administrator";
import AddAdministratorPage from "../../administration/administrator/add/Administrator";
import ListAdministratorPage from "../../administration/administrator/list/Administrator";
import ViewAdmin from "../../administration/administrator/list/ViewAdmin";
import Etats from "../../administration/Etats/Etats";
import AddEventPage from "../../administration/event/add/Event";
import ListEventPage from "../../administration/event/list/Event";
import Partners from "../../administration/Partners/list/Partners";
import addPartners from "../../administration/Partners/add/addPartners";
import log from "../../administration/log/log";
import store from "../../administration/Store/list/store";
import journals from "../../administration/journaux/journal/journals";
import comission from "../../administration/Comissions/comission"
import tickets from "../../administration/Tickets/tickets";
import addTicket from "../../administration/Tickets/addTicket"
import ViewEvent from "../../administration/event/list/ViewEvent"
import userAccounts from "../../pages/dashboard/userAccounts"
import accountActivity from "../../pages/dashboard/accountActivity"
import ticketsEvent from "../../administration/event/list/ticketsEvent";



class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {

    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          // !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          "dashboard-light",
        ].join(" ")}
        onClick={e => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/main/dashboard" />}
                    />
                    <Route
                      path="/app/main/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route path={"/app/typography"} component={Typography} />
                    <Route path={"/app/tables"} component={Tables} />
                    <Route path={"/app/ui/maps"} component={Maps} />
                    <Route
                      path={"/app/ui/notifications"}
                      component={Notifications}
                    />
                    <Route path={"/app/ui/icons"} component={Icons} />
                    <Route path={"/app/ui/charts"} component={Charts} />
                    <Route path={"/app/administration/Partners/list"}  component={Partners}/>
                    <Route path={"/app/administration/store/list"}  component={store}/>
                    <Route path={"/app/administration/Partners/addPartners"}  component={addPartners}/>
                    <Route path={"/app/administration/log/log"}  component={log}/>
                    <Route path={"/app/administration/journaux/journal/journal"}  component={journals}/>
                    <Route path={"/app/administration/Comissions/comission"}  component={comission}/>
                    <Route path={"/app/administration/Tickets/tickets"}  component={tickets}/>
                    <Route path={"/app/administration/Tickets/addTicket"}  component={addTicket}/>
                    <Route path={"/app/administration/event/list/ViewEvent"}  component={ViewEvent}/>
                    <Route path={"/app/administration/administrator/list/ViewAdmin"} component={ViewAdmin} />
                    <Route path={"/app/administration/event/list/ticketsEvent"} component={ticketsEvent}/>
                    <Route path={"/app/administration/Etats/Etats"} component={Etats} />
                    


                    <Route path={"/app/administration/event/add"} component={AddEventPage} />
                    <Route path={"/app/administration/event/list"} component={ListEventPage} />
                    <Route path={"/App/pages/dashboard/userAccounts"} component={userAccounts}/>
                    <Route path={"/App/pages/dashboard/accountActivity"} component={accountActivity}/>

                    {/* <Route path={"/app/administration/administrator"} component={Administrator} /> */}
                    <Route path={"/app/administration/administrator/add"} component={AddAdministratorPage} />
                    <Route path={"/app/administration/administrator/list"} component={ListAdministratorPage} />
                    
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
