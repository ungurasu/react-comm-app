import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    media: {
        height: 260,
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cartActions: {
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
    productName: {
        fontSize: "20px",
    },
    productPrice: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#de0000"
    }
}));