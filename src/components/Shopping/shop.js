import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardGiftcard from '@material-ui/icons/CardGiftcard'
import { cataloguecategory } from '../store';
import InlineError from '../Messages/InlineErrors'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux";
import api from '../../api';


const styles = withStyles({
    root: {
        flexGrow: 1,
        textAlign:'center'
    },
});
class shop extends React.Component {
    constructor() {
        super();
        this.state = {
            category: "",
            listCatalogue: [],
            awards: 0, 
            errorRequest:""
        }
    }
    componentDidMount() {
        api.user.getUserById(this.props.user[0]._id)
            .then(data => {
                this.setState({ awards: data.user.award })
            })
            .catch(err =>
                this.setState({ errorRequest: err.response.data.message })
                );
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        api.catalogue.getCatalogueByCategoryandLocation(event.target.value, this.props.user[0].Location._id)
            .then(data => {
                this.setState({ listCatalogue: data.catalogues });
            })
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    handleClick = (event, categoryId) => {
        event.preventDefault();
        api.shopping.create(categoryId)
            .then(() => window.location.href = "/shopping")
            .catch(err => {
                this.setState({ errorRequest: err.response.data.message })
            });
    };
    render() {
        const { classes } = this.props;
        const { category, listCatalogue, awards } = this.state;
        return (
            <div>
                <br/>
                <Grid container >
                    <Grid item xs>
                    </Grid>
                    {this.state.errorRequest ? <InlineError text={this.state.errorRequest} /> : null}
                    {awards > 0 ?
                        <Grid className={classes.root}  item xs={6}>
                            <Typography variant="h6">
                                Avantica Shop
                       </Typography>
                            <br />
                            <TextField
                                id="select-category"
                                select
                                label="Select the Category"
                                className={classes.textField}
                                value={category}
                                name="category"
                                onChange={this.handleChange}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Please select the category"
                                margin="normal"
                            >
                                {cataloguecategory.map(option => (
                                    <MenuItem key={option.category} value={option.category}>
                                        {option.category}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div className={classes.demo}>
                                <List>
                                    {listCatalogue.map(row => (
                                        <ListItem key={row._id} value={row._id}>
                                            <ListItemAvatar>
                                                <Avatar >
                                                    <MuiThemeProvider >
                                                        <CardGiftcard color="primary" fontSize="large" />
                                                    </MuiThemeProvider>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {row.title}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <Button onClick={(e) => {
                                                    this.handleClick(e, row._id)
                                                }} variant="contained" color="primary" className={classes.button}>
                                                    Buy
                                            </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                    )}
                                </List>
                            </div>
                        </Grid>
                        :
                        <Grid className={classes.root}  item xs={6}>
                            <InlineError text={"You don't have awards"} />
                        </Grid>
                    }
                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
shop.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return { user: state.auth };
}
export default connect(mapStateToProps, null)(withStyles(styles)(shop));