
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resourceConferenceData = [
        {
            Id: 1,
            Subject: 'Burning Man',
            StartTime: new Date(2018, 5, 1, 15, 0),
            EndTime: new Date(2018, 5, 1, 17, 0),
            ConferenceId: [1, 2, 3]
        }, {
            Id: 2,
            Subject: 'Data-Driven Economy',
            StartTime: new Date(2018, 5, 2, 12, 0),
            EndTime: new Date(2018, 5, 2, 14, 0),
            ConferenceId: [1, 2]
        }, {
            Id: 3,
            Subject: 'Techweek',
            StartTime: new Date(2018, 5, 2, 15, 0),
            EndTime: new Date(2018, 5, 2, 17, 0),
            ConferenceId: [2, 3]
        }, {
            Id: 4,
            Subject: 'Content Marketing World',
            StartTime: new Date(2018, 5, 2, 18, 0),
            EndTime: new Date(2018, 5, 2, 20, 0),
            ConferenceId: [1, 3]
        }, {
            Id: 5,
            Subject: 'B2B Marketing Forum',
            StartTime: new Date(2018, 5, 3, 10, 0),
            EndTime: new Date(2018, 5, 3, 12, 0),
            ConferenceId: [1, 2, 3]
        }
    ];

    exports.resourceProjectData = [
        {
            Id: 61,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 4, 9, 30),
            EndTime: new Date(2018, 3, 4, 10, 30),
            IsAllDay: false,
            ProjectId: 2,
            CategoryId: 2
        }, {
            Id: 62,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 4, 13, 30),
            EndTime: new Date(2018, 3, 4, 16, 30),
            IsAllDay: false,
            ProjectId: 2,
            CategoryId: 1
        }, {
            Id: 63,
            Subject: 'Functionality testing',
            StartTime: new Date(2018, 3, 4, 9),
            EndTime: new Date(2018, 3, 4, 10, 30),
            IsAllDay: false,
            ProjectId: 1,
            CategoryId: 1
        }, {
            Id: 64,
            Subject: 'Resolution-based testing',
            StartTime: new Date(2018, 3, 4, 12),
            EndTime: new Date(2018, 3, 4, 13),
            IsAllDay: false,
            ProjectId: 1,
            CategoryId: 1
        }, {
            Id: 65,
            Subject: 'Test report Validation',
            StartTime: new Date(2018, 3, 4, 15),
            EndTime: new Date(2018, 3, 4, 18),
            IsAllDay: false,
            ProjectId: 1,
            CategoryId: 1
        }, {
            Id: 66,
            Subject: 'Test case correction',
            StartTime: new Date(2018, 3, 4, 14),
            EndTime: new Date(2018, 3, 4, 16),
            IsAllDay: false,
            ProjectId: 1,
            CategoryId: 2
        }, {
            Id: 67,
            Subject: 'Bug fixing',
            StartTime: new Date(2018, 3, 4, 14, 30),
            EndTime: new Date(2018, 3, 4, 18, 30),
            IsAllDay: false,
            ProjectId: 2,
            CategoryId: 2
        }, {
            Id: 68,
            Subject: 'Run test cases',
            StartTime: new Date(2018, 3, 4, 17, 30),
            EndTime: new Date(2018, 3, 4, 19, 30),
            IsAllDay: false,
            ProjectId: 1,
            CategoryId: 2
        }, {
            Id: 70,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 4, 18, 30),
            EndTime: new Date(2018, 3, 4, 20),
            IsAllDay: false,
            ProjectId: 2,
            CategoryId: 1
        }
    ];

    exports.resourceData = [
        {
            Id: 1,
            Subject: 'Workflow Analysis',
            StartTime: new Date(2018, 3, 1, 9, 30),
            EndTime: new Date(2018, 3, 1, 12, 0),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 2,
            Subject: 'Requirement planning',
            StartTime: new Date(2018, 3, 1, 12, 30),
            EndTime: new Date(2018, 3, 1, 14, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 3,
            Subject: 'Quality Analysis',
            StartTime: new Date(2018, 3, 2, 10, 0),
            EndTime: new Date(2018, 3, 2, 12, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 4,
            Subject: 'Resource planning',
            StartTime: new Date(2018, 3, 2, 13, 0),
            EndTime: new Date(2018, 3, 2, 15, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 5,
            Subject: 'Timeline estimation',
            StartTime: new Date(2018, 3, 3, 9, 0),
            EndTime: new Date(2018, 3, 3, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 6,
            Subject: 'Developers Meeting',
            StartTime: new Date(2018, 3, 3, 14, 0),
            EndTime: new Date(2018, 3, 3, 16, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 7,
            Subject: 'Project Review',
            StartTime: new Date(2018, 3, 4, 11, 15),
            EndTime: new Date(2018, 3, 4, 13, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 8,
            Subject: 'Manual testing',
            StartTime: new Date(2018, 3, 4, 9, 15),
            EndTime: new Date(2018, 3, 4, 11, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 9,
            Subject: 'Project Preview',
            StartTime: new Date(2018, 3, 5, 9, 30),
            EndTime: new Date(2018, 3, 5, 12, 45),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 10,
            Subject: 'Cross-browser testing',
            StartTime: new Date(2018, 3, 5, 13, 45),
            EndTime: new Date(2018, 3, 5, 16, 30),
            IsAllDay: false,
            OwnerId: 2
        }, {
            Id: 11,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 6, 10, 0),
            EndTime: new Date(2018, 3, 6, 12, 15),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 12,
            Subject: 'Functionality testing',
            StartTime: new Date(2018, 3, 6, 9, 0),
            EndTime: new Date(2018, 3, 6, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 13,
            Subject: 'Resolution-based testing',
            StartTime: new Date(2018, 3, 7, 13, 0),
            EndTime: new Date(2018, 3, 7, 15, 15),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 14,
            Subject: 'Test report Validation',
            StartTime: new Date(2018, 3, 7, 9),
            EndTime: new Date(2018, 3, 7, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 15,
            Subject: 'Test case correction',
            StartTime: new Date(2018, 3, 8, 9, 45),
            EndTime: new Date(2018, 3, 8, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 16,
            Subject: 'Run test cases',
            StartTime: new Date(2018, 3, 8, 10, 30),
            EndTime: new Date(2018, 3, 8, 13, 0),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 17,
            Subject: 'Quality Analysis',
            StartTime: new Date(2018, 3, 9, 12),
            EndTime: new Date(2018, 3, 9, 15, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 18,
            Subject: 'Debugging',
            StartTime: new Date(2018, 3, 9, 9, 0),
            EndTime: new Date(2018, 3, 9, 11, 15),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 19,
            Subject: 'Exception handling',
            StartTime: new Date(2018, 3, 10, 10, 10),
            EndTime: new Date(2018, 3, 10, 13, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 20,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 10, 10, 30),
            EndTime: new Date(2018, 3, 10, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 21,
            Subject: 'workflow Analysis',
            StartTime: new Date(2018, 3, 11, 9, 30),
            EndTime: new Date(2018, 3, 11, 11, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 22,
            Subject: 'Requirement planning',
            StartTime: new Date(2018, 3, 11, 12, 30),
            EndTime: new Date(2018, 3, 11, 14, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 23,
            Subject: 'Quality Analysis',
            StartTime: new Date(2018, 3, 12, 10),
            EndTime: new Date(2018, 3, 12, 12, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 24,
            Subject: 'Resource planning',
            StartTime: new Date(2018, 3, 12, 13),
            EndTime: new Date(2018, 3, 12, 14, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 25,
            Subject: 'Timeline estimation',
            StartTime: new Date(2018, 3, 13, 9),
            EndTime: new Date(2018, 3, 13, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 26,
            Subject: 'Developers Meeting',
            StartTime: new Date(2018, 3, 13, 14),
            EndTime: new Date(2018, 3, 13, 15, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 27,
            Subject: 'Project Review',
            StartTime: new Date(2018, 3, 14, 11),
            EndTime: new Date(2018, 3, 14, 13),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 28,
            Subject: 'Manual testing',
            StartTime: new Date(2018, 3, 14, 9),
            EndTime: new Date(2018, 3, 14, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 29,
            Subject: 'Project Preview',
            StartTime: new Date(2018, 3, 15, 9, 30),
            EndTime: new Date(2018, 3, 15, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 30,
            Subject: 'Cross-browser testing',
            StartTime: new Date(2018, 3, 15, 14),
            EndTime: new Date(2018, 3, 15, 16, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 31,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 16, 10),
            EndTime: new Date(2018, 3, 16, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 32,
            Subject: 'Functionality testing',
            StartTime: new Date(2018, 3, 16, 9),
            EndTime: new Date(2018, 3, 16, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 33,
            Subject: 'Resolution-based testing',
            StartTime: new Date(2018, 3, 17, 14),
            EndTime: new Date(2018, 3, 17, 15),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 34,
            Subject: 'Test report Validation',
            StartTime: new Date(2018, 3, 17, 9),
            EndTime: new Date(2018, 3, 17, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 35,
            Subject: 'Test case correction',
            StartTime: new Date(2018, 3, 18, 10),
            EndTime: new Date(2018, 3, 18, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 36,
            Subject: 'Run test cases',
            StartTime: new Date(2018, 3, 18, 10),
            EndTime: new Date(2018, 3, 18, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 37,
            Subject: 'Bug fixing',
            StartTime: new Date(2018, 3, 9, 10),
            EndTime: new Date(2018, 3, 9, 10, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 38,
            Subject: 'Debugging',
            StartTime: new Date(2018, 3, 19, 9),
            EndTime: new Date(2018, 3, 19, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 39,
            Subject: 'Exception handling',
            StartTime: new Date(2018, 3, 20, 10),
            EndTime: new Date(2018, 3, 20, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 40,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 20, 10, 30),
            EndTime: new Date(2018, 3, 20, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 41,
            Subject: 'workflow Analysis',
            StartTime: new Date(2018, 3, 21, 9, 30),
            EndTime: new Date(2018, 3, 21, 11, 30),
            IsAllDay: false,
            OwnerId: 1, RoomId: 1
        }, {
            Id: 42,
            Subject: 'Requirement planning',
            StartTime: new Date(2018, 3, 21, 12, 30),
            EndTime: new Date(2018, 3, 21, 13, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 43,
            Subject: 'Quality Analysis',
            StartTime: new Date(2018, 3, 22, 10),
            EndTime: new Date(2018, 3, 22, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 44,
            Subject: 'Resource planning',
            StartTime: new Date(2018, 3, 22, 13),
            EndTime: new Date(2018, 3, 22, 14, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 45,
            Subject: 'Timeline estimation',
            StartTime: new Date(2018, 3, 23, 9),
            EndTime: new Date(2018, 3, 23, 10),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 46,
            Subject: 'Developers Meeting',
            StartTime: new Date(2018, 3, 23, 14),
            EndTime: new Date(2018, 3, 23, 15, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 47,
            Subject: 'Project Review',
            StartTime: new Date(2018, 3, 24, 11),
            EndTime: new Date(2018, 3, 24, 12),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 48,
            Subject: 'Manual testing',
            StartTime: new Date(2018, 3, 24, 9),
            EndTime: new Date(2018, 3, 24, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 49,
            Subject: 'Project Preview',
            StartTime: new Date(2018, 3, 25, 9, 30),
            EndTime: new Date(2018, 3, 25, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 50,
            Subject: 'Cross-browser testing',
            StartTime: new Date(2018, 3, 25, 14),
            EndTime: new Date(2018, 3, 25, 15, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 51,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 26, 10),
            EndTime: new Date(2018, 3, 26, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 52,
            Subject: 'Functionality testing',
            StartTime: new Date(2018, 3, 26, 9),
            EndTime: new Date(2018, 3, 26, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 53,
            Subject: 'Resolution-based testing',
            StartTime: new Date(2018, 3, 27, 14),
            EndTime: new Date(2018, 3, 27, 15),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 54,
            Subject: 'Test report Validation',
            StartTime: new Date(2018, 3, 27, 9),
            EndTime: new Date(2018, 3, 27, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 55,
            Subject: 'Test case correction',
            StartTime: new Date(2018, 3, 28, 10),
            EndTime: new Date(2018, 3, 28, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 56,
            Subject: 'Run test cases',
            StartTime: new Date(2018, 3, 28, 10),
            EndTime: new Date(2018, 3, 28, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 57,
            Subject: 'Bug fixing',
            StartTime: new Date(2018, 3, 29, 12),
            EndTime: new Date(2018, 3, 29, 12, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 58,
            Subject: 'Debugging',
            StartTime: new Date(2018, 3, 29, 9),
            EndTime: new Date(2018, 3, 29, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 59,
            Subject: 'Exception handling',
            StartTime: new Date(2018, 3, 30, 10),
            EndTime: new Date(2018, 3, 30, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 60,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 30, 10, 30),
            EndTime: new Date(2018, 3, 30, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        },
		{
            Id: 61,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 30, 10, 30),
            EndTime: new Date(2018, 3, 30, 12, 30),
            IsAllDay: false,
            OwnerId: 4,
            RoomId: 2
        }
    ];

    exports.timelineResourceData = [
        {
            Id: 61,
            Subject: 'Decoding',
            StartTime: new Date(2018, 3, 4, 9, 30),
            EndTime: new Date(2018, 3, 4, 10, 30),
            IsAllDay: false,
            ProjectId: 2,
            TaskId: 2
        }, {
            Id: 62,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 4, 16, 0),
            EndTime: new Date(2018, 3, 4, 20, 0),
            IsAllDay: false,
            ProjectId: 2,
            TaskId: 1
        }, {
            Id: 63,
            Subject: 'Functionality testing',
            StartTime: new Date(2018, 3, 4, 9),
            EndTime: new Date(2018, 3, 4, 10, 30),
            IsAllDay: false,
            ProjectId: 1,
            TaskId: 1
        }, {
            Id: 64,
            Subject: 'Resolution-based testing',
            StartTime: new Date(2018, 3, 4, 12),
            EndTime: new Date(2018, 3, 4, 15, 0),
            IsAllDay: false,
            ProjectId: 2,
            TaskId: 4
        }, {
            Id: 65,
            Subject: 'Test report Validation',
            StartTime: new Date(2018, 3, 4, 15),
            EndTime: new Date(2018, 3, 4, 18),
            IsAllDay: false,
            ProjectId: 1,
            TaskId: 1
        }, {
            Id: 66,
            Subject: 'Test case correction',
            StartTime: new Date(2018, 3, 4, 14),
            EndTime: new Date(2018, 3, 4, 16),
            IsAllDay: false,
            ProjectId: 3,
            TaskId: 6
        }, {
            Id: 67,
            Subject: 'Bug fixing',
            StartTime: new Date(2018, 3, 4, 14, 30),
            EndTime: new Date(2018, 3, 4, 18, 30),
            IsAllDay: false,
            ProjectId: 3,
            TaskId: 5
        }, {
            Id: 68,
            Subject: 'Run test cases',
            StartTime: new Date(2018, 3, 4, 17, 30),
            EndTime: new Date(2018, 3, 4, 19, 30),
            IsAllDay: false,
            ProjectId: 2,
            TaskId: 4
        }, {
            Id: 70,
            Subject: 'Bug Automation',
            StartTime: new Date(2018, 3, 4, 16, 0),
            EndTime: new Date(2018, 3, 4, 20, 0),
            IsAllDay: false,
            ProjectId: 2,
            TaskId: 3
        },
    ];
	    exports.machineData = [
        {
            Id: 1,
            Subject: '8',
            StartTime: new Date(2018, 3, 1, 9, 30),
            EndTime: new Date(2018, 3, 1, 12, 0),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 2,
            Subject: '8',
            StartTime: new Date(2018, 3, 1, 12, 30),
            EndTime: new Date(2018, 3, 1, 14, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 3,
            Subject: '8',
            StartTime: new Date(2018, 3, 2, 10, 0),
            EndTime: new Date(2018, 3, 2, 12, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 4,
            Subject: '8',
            StartTime: new Date(2018, 3, 2, 13, 0),
            EndTime: new Date(2018, 3, 2, 15, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 5,
            Subject: '8',
            StartTime: new Date(2018, 3, 3, 9, 0),
            EndTime: new Date(2018, 3, 3, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 6,
            Subject: '8',
            StartTime: new Date(2018, 3, 3, 14, 0),
            EndTime: new Date(2018, 3, 3, 16, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 7,
            Subject: '8',
            StartTime: new Date(2018, 3, 4, 11, 15),
            EndTime: new Date(2018, 3, 4, 13, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 8,
            Subject: '8',
            StartTime: new Date(2018, 3, 4, 9, 15),
            EndTime: new Date(2018, 3, 4, 11, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 9,
            Subject: '8',
            StartTime: new Date(2018, 3, 5, 9, 30),
            EndTime: new Date(2018, 3, 5, 12, 45),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 10,
            Subject: '8',
            StartTime: new Date(2018, 3, 5, 13, 45),
            EndTime: new Date(2018, 3, 5, 16, 30),
            IsAllDay: false,
            OwnerId: 2
        }, {
            Id: 11,
            Subject: '8',
            StartTime: new Date(2018, 3, 6, 10, 0),
            EndTime: new Date(2018, 3, 6, 12, 15),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 12,
            Subject: '8',
            StartTime: new Date(2018, 3, 6, 9, 0),
            EndTime: new Date(2018, 3, 6, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 13,
            Subject: '8',
            StartTime: new Date(2018, 3, 7, 13, 0),
            EndTime: new Date(2018, 3, 7, 15, 15),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 14,
            Subject: '8',
            StartTime: new Date(2018, 3, 7, 9),
            EndTime: new Date(2018, 3, 7, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 15,
            Subject: '8',
            StartTime: new Date(2018, 3, 8, 9, 45),
            EndTime: new Date(2018, 3, 8, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 16,
            Subject: '8',
            StartTime: new Date(2018, 3, 8, 10, 30),
            EndTime: new Date(2018, 3, 8, 13, 0),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 17,
            Subject: '8',
            StartTime: new Date(2018, 3, 9, 12),
            EndTime: new Date(2018, 3, 9, 15, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 18,
            Subject: '8',
            StartTime: new Date(2018, 3, 9, 9, 0),
            EndTime: new Date(2018, 3, 9, 11, 15),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 19,
            Subject: '8',
            StartTime: new Date(2018, 3, 10, 10, 10),
            EndTime: new Date(2018, 3, 10, 13, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 20,
            Subject: '8',
            StartTime: new Date(2018, 3, 10, 10, 30),
            EndTime: new Date(2018, 3, 10, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 21,
            Subject: '8',
            StartTime: new Date(2018, 3, 11, 9, 30),
            EndTime: new Date(2018, 3, 11, 11, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 22,
            Subject: '8',
            StartTime: new Date(2018, 3, 11, 12, 30),
            EndTime: new Date(2018, 3, 11, 14, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 23,
            Subject: '8',
            StartTime: new Date(2018, 3, 12, 10),
            EndTime: new Date(2018, 3, 12, 12, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 24,
            Subject: '8',
            StartTime: new Date(2018, 3, 12, 13),
            EndTime: new Date(2018, 3, 12, 14, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 25,
            Subject: '8',
            StartTime: new Date(2018, 3, 13, 9),
            EndTime: new Date(2018, 3, 13, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 26,
            Subject: '8',
            StartTime: new Date(2018, 3, 13, 14),
            EndTime: new Date(2018, 3, 13, 15, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 27,
            Subject: '8',
            StartTime: new Date(2018, 3, 14, 11),
            EndTime: new Date(2018, 3, 14, 13),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 28,
            Subject: '8',
            StartTime: new Date(2018, 3, 14, 9),
            EndTime: new Date(2018, 3, 14, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 29,
            Subject: '8',
            StartTime: new Date(2018, 3, 15, 9, 30),
            EndTime: new Date(2018, 3, 15, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 30,
            Subject: '8',
            StartTime: new Date(2018, 3, 15, 14),
            EndTime: new Date(2018, 3, 15, 16, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 31,
            Subject: '8',
            StartTime: new Date(2018, 3, 16, 10),
            EndTime: new Date(2018, 3, 16, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 32,
            Subject: '8',
            StartTime: new Date(2018, 3, 16, 9),
            EndTime: new Date(2018, 3, 16, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 33,
            Subject: '8',
            StartTime: new Date(2018, 3, 17, 14),
            EndTime: new Date(2018, 3, 17, 15),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 34,
            Subject: '8',
            StartTime: new Date(2018, 3, 17, 9),
            EndTime: new Date(2018, 3, 17, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 35,
            Subject: '8',
            StartTime: new Date(2018, 3, 18, 10),
            EndTime: new Date(2018, 3, 18, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 36,
            Subject: '8',
            StartTime: new Date(2018, 3, 18, 10),
            EndTime: new Date(2018, 3, 18, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 37,
            Subject: '8',
            StartTime: new Date(2018, 3, 9, 10),
            EndTime: new Date(2018, 3, 9, 10, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 38,
            Subject: '8',
            StartTime: new Date(2018, 3, 19, 9),
            EndTime: new Date(2018, 3, 19, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 39,
            Subject: '8',
            StartTime: new Date(2018, 3, 20, 10),
            EndTime: new Date(2018, 3, 20, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 40,
            Subject: '8',
            StartTime: new Date(2018, 3, 20, 10, 30),
            EndTime: new Date(2018, 3, 20, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 41,
            Subject: '8',
            StartTime: new Date(2018, 3, 21, 9, 30),
            EndTime: new Date(2018, 3, 21, 11, 30),
            IsAllDay: false,
            OwnerId: 1, RoomId: 1
        }, {
            Id: 42,
            Subject: '8',
            StartTime: new Date(2018, 3, 21, 12, 30),
            EndTime: new Date(2018, 3, 21, 13, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 43,
            Subject: '8',
            StartTime: new Date(2018, 3, 22, 10),
            EndTime: new Date(2018, 3, 22, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 44,
            Subject: '8',
            StartTime: new Date(2018, 3, 22, 13),
            EndTime: new Date(2018, 3, 22, 14, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 45,
            Subject: '8',
            StartTime: new Date(2018, 3, 23, 9),
            EndTime: new Date(2018, 3, 23, 10),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 46,
            Subject: '8',
            StartTime: new Date(2018, 3, 23, 14),
            EndTime: new Date(2018, 3, 23, 15, 45),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 47,
            Subject: '8',
            StartTime: new Date(2018, 3, 24, 11),
            EndTime: new Date(2018, 3, 24, 12),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 48,
            Subject: '8',
            StartTime: new Date(2018, 3, 24, 9),
            EndTime: new Date(2018, 3, 24, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 49,
            Subject: '8',
            StartTime: new Date(2018, 3, 25, 9, 30),
            EndTime: new Date(2018, 3, 25, 11),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 50,
            Subject: '8',
            StartTime: new Date(2018, 3, 25, 14),
            EndTime: new Date(2018, 3, 25, 15, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 51,
            Subject: '8',
            StartTime: new Date(2018, 3, 26, 10),
            EndTime: new Date(2018, 3, 26, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 52,
            Subject: '8',
            StartTime: new Date(2018, 3, 26, 9),
            EndTime: new Date(2018, 3, 26, 11, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 53,
            Subject: '8',
            StartTime: new Date(2018, 3, 27, 14),
            EndTime: new Date(2018, 3, 27, 15),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 54,
            Subject: '8',
            StartTime: new Date(2018, 3, 27, 9),
            EndTime: new Date(2018, 3, 27, 11),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 55,
            Subject: '8',
            StartTime: new Date(2018, 3, 28, 10),
            EndTime: new Date(2018, 3, 28, 11, 30),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 56,
            Subject: '8',
            StartTime: new Date(2018, 3, 28, 10),
            EndTime: new Date(2018, 3, 28, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 57,
            Subject: '8',
            StartTime: new Date(2018, 3, 29, 12),
            EndTime: new Date(2018, 3, 29, 12, 30),
            IsAllDay: false,
            OwnerId: 3,
            RoomId: 1
        }, {
            Id: 58,
            Subject: '8',
            StartTime: new Date(2018, 3, 29, 9),
            EndTime: new Date(2018, 3, 29, 10, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        }, {
            Id: 59,
            Subject: '8',
            StartTime: new Date(2018, 3, 30, 10),
            EndTime: new Date(2018, 3, 30, 11),
            IsAllDay: false,
            OwnerId: 1,
            RoomId: 1
        }, {
            Id: 60,
            Subject: '8',
            StartTime: new Date(2018, 3, 30, 10, 30),
            EndTime: new Date(2018, 3, 30, 12, 30),
            IsAllDay: false,
            OwnerId: 2,
            RoomId: 2
        },
		{
            Id: 61,
            Subject: '8',
            StartTime: new Date(2018, 3, 30, 10, 30),
            EndTime: new Date(2018, 3, 30, 12, 30),
            IsAllDay: false,
            OwnerId: 4,
            RoomId: 2
        }
    ];

});