import { DataTypes, Model, Sequelize, type Optional } from "sequelize";

export interface SongAttributes {
    id: string;
    user_id: string;

    title: string;
    description?: string;

    sheet_pdf: string;
    audio_url?: string;
    video_url?: string;
    external_link?: string;

    created_at: Date;
    updated_at: Date;
}

export interface SongCreationAttributes
    extends Optional<
        SongAttributes,
        | "id" | "description" | "audio_url" | "video_url" | "external_link" | "created_at" | "updated_at"
    > { }

export class Song
  extends Model<SongAttributes, SongCreationAttributes>
  implements SongAttributes
{
  declare id: string;
  declare user_id: string;

  declare title: string;
  declare description?: string;

  declare sheet_pdf: string;
  declare audio_url?: string;
  declare video_url?: string;
  declare external_link?: string;

  declare created_at: Date;
  declare updated_at: Date;

  
}

export const initSongModel = (sequelize: Sequelize) => {
  Song.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      sheet_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      audio_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      video_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      external_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "songs",
      modelName: "Song",

      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};