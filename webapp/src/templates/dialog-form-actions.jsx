import React from 'react';
import { Button } from '@material-ui/core';

const DialogFormActions = props => {
    const { pristine, submitting, reset, cancel } = props;
    return (
        <div>
            {cancel &&
                <Button onClick={cancel} color={'secondary'}>
                    Annuler
                </Button>}
            {reset &&
                <Button onClick={reset} color={'secondary'} disabled={pristine || submitting}>
                    Réinitialiser
                </Button>}
            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={pristine || submitting}>
                Ajouter
            </Button>
        </div>
    );
}
export default DialogFormActions;