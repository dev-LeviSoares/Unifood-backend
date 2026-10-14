import { randomUUID } from "node:crypto";

interface RefreshTokenProps {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export class RefreshToken {
  private props: RefreshTokenProps;

  private constructor(props: RefreshTokenProps) {
    this.props = props;
  }

  static create(input: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return new RefreshToken({
      id: randomUUID(),
      userId: input.userId,
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt,
      revokedAt: null,
      createdAt: new Date(),
    });
  }

  static restore(props: RefreshTokenProps) {
    return new RefreshToken(props);
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get tokenHash() {
    return this.props.tokenHash;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get revokedAt() {
    return this.props.revokedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get isExpired() {
    return this.props.expiresAt.getTime() <= Date.now();
  }

  get isRevoked() {
    return this.props.revokedAt !== null;
  }

  get isActive() {
    return !this.isExpired && !this.isRevoked;
  }

  revoke() {
    this.props.revokedAt = new Date();
  }
}