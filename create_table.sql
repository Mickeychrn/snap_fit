SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[SnapfitQueries];

GO

CREATE TABLE [dbo].[SnapfitQueries]
(
    [OrderID] INT IDENTITY (1, 1) NOT NULL,
    [TyreSize] NVARCHAR (30) NULL,
    [Fname] CHAR (50) NULL,
    [Email] VARCHAR (50) NULL,
    [Quantity] INT NULL,
    [PostalCode] INT NULL,
    [Phone] VARCHAR (15) NULL,
    [CarBrand] VARCHAR (20) NULL,
    [CarModel] VARCHAR (20) NULL,
    [PrefferedBrand] VARCHAR (20) NULL,
    [VoucherCode] VARCHAR (50) NULL,
    [ImagePath] TEXT NULL,
    [ThumbPath] TEXT NULL,
    [OrderDateTime] DATETIME NOT NULL DEFAULT (dateadd(hour,+10,getdate())),
    [OrderStatus] INT NOT NULL DEFAULT 0,
    [OfferResponse] VARCHAR (2048) NULL,
    [OfferSent] BIT NULL DEFAULT 0,
    [agreedToTerms] BIT NULL DEFAULT 0
);