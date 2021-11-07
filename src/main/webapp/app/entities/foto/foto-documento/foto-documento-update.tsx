import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocumento } from 'app/shared/model/user/documento.model';
import { getEntities as getDocumentos } from 'app/entities/user/documento/documento.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './foto-documento.reducer';
import { IFotoDocumento } from 'app/shared/model/foto/foto-documento.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFotoDocumentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FotoDocumentoUpdate = (props: IFotoDocumentoUpdateProps) => {
  const [documentoId, setDocumentoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fotoDocumentoEntity, documentos, loading, updating } = props;

  const { conteudo, conteudoContentType } = fotoDocumentoEntity;

  const handleClose = () => {
    props.history.push('/foto-documento' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDocumentos();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...fotoDocumentoEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="usersApp.fotoFotoDocumento.home.createOrEditLabel">
            <Translate contentKey="usersApp.fotoFotoDocumento.home.createOrEditLabel">Create or edit a FotoDocumento</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fotoDocumentoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="foto-documento-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="foto-documento-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="conteudoLabel" for="conteudo">
                    <Translate contentKey="usersApp.fotoFotoDocumento.conteudo">Conteudo</Translate>
                  </Label>
                  <br />
                  {conteudo ? (
                    <div>
                      {conteudoContentType ? (
                        <a onClick={openFile(conteudoContentType, conteudo)}>
                          <img src={`data:${conteudoContentType};base64,${conteudo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {conteudoContentType}, {byteSize(conteudo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('conteudo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_conteudo" type="file" onChange={onBlobChange(true, 'conteudo')} accept="image/*" />
                  <AvInput
                    type="hidden"
                    name="conteudo"
                    value={conteudo}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="foto-documento-documento">
                  <Translate contentKey="usersApp.fotoFotoDocumento.documento">Documento</Translate>
                </Label>
                <AvInput id="foto-documento-documento" type="select" className="form-control" name="documento.id">
                  <option value="" key="0" />
                  {documentos
                    ? documentos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/foto-documento" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  documentos: storeState.documento.entities,
  fotoDocumentoEntity: storeState.fotoDocumento.entity,
  loading: storeState.fotoDocumento.loading,
  updating: storeState.fotoDocumento.updating,
  updateSuccess: storeState.fotoDocumento.updateSuccess,
});

const mapDispatchToProps = {
  getDocumentos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FotoDocumentoUpdate);
