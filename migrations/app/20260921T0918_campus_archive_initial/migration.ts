#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e7745bb007ab211da9a7af8b51f111eb49599a03bb2530bbbf4ecd40105d289d/contract';
import endContract from '../../snapshots/e7745bb007ab211da9a7af8b51f111eb49599a03bb2530bbbf4ecd40105d289d/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'department',
        columns: [
          col('code', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'project',
        columns: [
          col('academicYear', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('category', 'text', {
            notNull: true,
            default: lit('OTHER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('departmentId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('facultyId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('studentId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('technologies', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'project_category_check_b091c6f8',
            "\"category\" IN ('IOT', 'WEB', 'AI', 'MOBILE', 'DATA', 'ROBOTICS', 'OTHER')",
          ),
          checkExpression(
            'project_status_check_da291b5b',
            "\"status\" IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ARCHIVED', 'REJECTED')",
          ),
          checkExpression(
            'project_technologies_elem_not_null_89b37e18',
            'array_position("technologies", NULL) IS NULL',
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'projectDocument',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fileType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('fileUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('mimeType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('projectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sizeBytes', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('uploadedById', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'projectMember',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('projectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('MEMBER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('departmentId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('STUDENT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_role_check_d4da3d50',
            "\"role\" IN ('STUDENT', 'FACULTY', 'ADMIN')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'department',
        constraint: 'department_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'department',
        constraint: 'department_code_key',
        columns: ['code'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'projectMember',
        constraint: 'projectMember_projectId_userId_key',
        columns: ['projectId', 'userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'department',
        index: 'department_code_idx_8e43b86b',
        columns: ['code'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'department',
        index: 'department_name_idx_ce87e6ba',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_academicYear_idx_954ca0a8',
        columns: ['academicYear'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_departmentId_idx_8e261ed8',
        columns: ['departmentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_facultyId_idx_ff3b8c32',
        columns: ['facultyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_studentId_idx_bf255322',
        columns: ['studentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_title_idx_1c94c7b6',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectDocument',
        index: 'projectDocument_name_idx_ce87e6ba',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectDocument',
        index: 'projectDocument_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectDocument',
        index: 'projectDocument_uploadedById_idx_b92fad21',
        columns: ['uploadedById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectMember',
        index: 'projectMember_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projectMember',
        index: 'projectMember_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_departmentId_idx_8e261ed8',
        columns: ['departmentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_role_idx_2c1ddf83',
        columns: ['role'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'project',
        foreignKey: {
          name: 'project_departmentId_fkey',
          columns: ['departmentId'],
          references: { schema: 'public', table: 'department', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'project',
        foreignKey: {
          name: 'project_studentId_fkey',
          columns: ['studentId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'project',
        foreignKey: {
          name: 'project_facultyId_fkey',
          columns: ['facultyId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectDocument',
        foreignKey: {
          name: 'projectDocument_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'project', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectDocument',
        foreignKey: {
          name: 'projectDocument_uploadedById_fkey',
          columns: ['uploadedById'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectMember',
        foreignKey: {
          name: 'projectMember_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'project', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projectMember',
        foreignKey: {
          name: 'projectMember_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'user',
        foreignKey: {
          name: 'user_departmentId_fkey',
          columns: ['departmentId'],
          references: { schema: 'public', table: 'department', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
