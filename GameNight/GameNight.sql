USE [GameNight]
GO

/****** Object:  Table [dbo].[User]    Script Date: 5/27/2021 7:31:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](20) NOT NULL,
	[LastName] [varchar](30) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[UserImage] [varchar](max) NULL,
	[FirebaseId] [varchar](max) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GameGroup]    Script Date: 5/27/2021 7:32:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GameGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Image] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_GameGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupUser]    Script Date: 5/27/2021 7:32:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GroupUser](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[Admin] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_GroupUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[GroupUser]  WITH CHECK ADD  CONSTRAINT [FK_GroupUser_GameGroup] FOREIGN KEY([GroupId])
REFERENCES [dbo].[GameGroup] ([Id])
GO

ALTER TABLE [dbo].[GroupUser] CHECK CONSTRAINT [FK_GroupUser_GameGroup]
GO

ALTER TABLE [dbo].[GroupUser]  WITH CHECK ADD  CONSTRAINT [FK_GroupUser_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[GroupUser] CHECK CONSTRAINT [FK_GroupUser_User]
GO
/****** Object:  Table [dbo].[BoardGame]    Script Date: 5/27/2021 7:32:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BoardGame](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[MinPlayers] [int] NULL,
	[MaxPlayers] [int] NULL,
	[Weight] [varchar](20) NOT NULL,
	[LengthInMinutes] [int] NOT NULL,
	[Genre] [varchar](40) NULL,
	[GameImage] [varchar](max) NULL,
 CONSTRAINT [PK_BoardGame] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[BoardGame]  WITH CHECK ADD  CONSTRAINT [FK_BoardGame_BoardGame] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[BoardGame] CHECK CONSTRAINT [FK_BoardGame_BoardGame]
GO
/****** Object:  Table [dbo].[GameNight]    Script Date: 5/27/2021 7:33:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GameNight](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_GameNight] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[GameNight]  WITH CHECK ADD  CONSTRAINT [FK_GameNight_GameGroup] FOREIGN KEY([GroupId])
REFERENCES [dbo].[GameGroup] ([Id])
GO

ALTER TABLE [dbo].[GameNight] CHECK CONSTRAINT [FK_GameNight_GameGroup]
GO
/****** Object:  Table [dbo].[GameNightGame]    Script Date: 5/27/2021 7:33:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GameNightGame](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GameId] [int] NOT NULL,
	[GameNightId] [int] NOT NULL,
	[Votes] [int] NOT NULL,
 CONSTRAINT [PK_GameNightGame] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[GameNightGame]  WITH CHECK ADD  CONSTRAINT [FK_GameNightGame_BoardGame] FOREIGN KEY([GameId])
REFERENCES [dbo].[BoardGame] ([Id])
GO

ALTER TABLE [dbo].[GameNightGame] CHECK CONSTRAINT [FK_GameNightGame_BoardGame]
GO

ALTER TABLE [dbo].[GameNightGame]  WITH CHECK ADD  CONSTRAINT [FK_GameNightGame_GameNight] FOREIGN KEY([GameNightId])
REFERENCES [dbo].[GameNight] ([Id])
GO

ALTER TABLE [dbo].[GameNightGame] CHECK CONSTRAINT [FK_GameNightGame_GameNight]
GO