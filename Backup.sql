USE [master]
GO
IF EXISTS (SELECT name from sys.databases WHERE (name = 'TodoDb'))
BEGIN
    ALTER DATABASE [TodoDb] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [TodoDb];
END;
GO
CREATE DATABASE [TodoDb]
GO
USE [TodoDb]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Todos](
	[Id] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[CompletedDate] [datetime2](7) NULL,
	[IsCompleted] [bit] NOT NULL,
	[DeletedDate] [datetime2](7) NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Todos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Todos] ([Id], [Description], [CreatedDate], [CompletedDate], [IsCompleted], [DeletedDate], [IsDeleted]) VALUES (N'480853b4-3027-40c9-a2dd-288b208ac7f6', N'Second Todo', CAST(N'2023-08-03T12:48:52.3960000' AS DateTime2), CAST(N'2023-08-03T18:43:09.2548910' AS DateTime2), 1, NULL, 0)
GO
INSERT [dbo].[Todos] ([Id], [Description], [CreatedDate], [CompletedDate], [IsCompleted], [DeletedDate], [IsDeleted]) VALUES (N'cc7bc579-1e26-47a4-b9e0-4230c8c40250', N'Fourth Todo', CAST(N'2023-08-03T14:49:25.6100000' AS DateTime2), CAST(N'2023-08-03T14:49:25.6100000' AS DateTime2), 0, NULL, 0)
GO
INSERT [dbo].[Todos] ([Id], [Description], [CreatedDate], [CompletedDate], [IsCompleted], [DeletedDate], [IsDeleted]) VALUES (N'84b9e9ca-cf6c-4be1-abb9-a77055f3d3d5', N'First Todo', CAST(N'2023-08-03T12:48:52.3960000' AS DateTime2), CAST(N'2023-08-03T20:27:22.1091773' AS DateTime2), 0, NULL, 0)
GO
INSERT [dbo].[Todos] ([Id], [Description], [CreatedDate], [CompletedDate], [IsCompleted], [DeletedDate], [IsDeleted]) VALUES (N'b67b5be6-8cab-4025-9b05-dccadb2efb75', N'Third Todo', CAST(N'2023-08-03T14:49:25.6100000' AS DateTime2), CAST(N'2023-08-03T20:20:24.4504746' AS DateTime2), 1, NULL, 0)
GO
ALTER TABLE [dbo].[Todos] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsDeleted]
GO
USE [master]
GO
ALTER DATABASE [TodoDb] SET  READ_WRITE 
GO
