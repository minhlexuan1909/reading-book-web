from datetime import date, datetime

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from pydantic import ValidationError

SECURITY_ALGORITHM = "HS256"
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"

reusable_oauth2 = HTTPBearer(scheme_name="Authorization")


def validate_token(http_authorization_credentials=Depends(reusable_oauth2)):
    """
    Decode JWT token
    """
    try:
        payload = jwt.decode(
            http_authorization_credentials.credentials,
            SECRET_KEY,
            algorithms=[SECURITY_ALGORITHM],
        )
        """ Convert int to timestamp """
        timestamp = datetime.fromtimestamp(payload["exp"])
        print(datetime.now())
        if timestamp < datetime.now():
            raise HTTPException(status_code=403, detail="Token expired")
        # return payload.get("username")
        return payload
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail=f"Could not validate credentials",
        )


def verify_admin(http_authorization_credentials=Depends(reusable_oauth2)):
    try:
        payload = jwt.decode(
            http_authorization_credentials.credentials,
            SECRET_KEY,
            algorithms=[SECURITY_ALGORITHM],
        )
        if payload["userRole"] != "admin":
            raise HTTPException(status_code=403, detail="You do not have permissions")
        return "ok"
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail=f"Could not validate credentials",
        )
