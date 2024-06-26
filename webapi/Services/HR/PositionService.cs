﻿using webapi.Models.HR;
using webapi.Models;
using System.Net;
using webapi.Constants;
using AutoMapper;
using webapi.Models.Views;

namespace webapi.Services.HR
{
    public interface IPositionService
    {
        public ResponseWithStatus<Response> CreatePosition(PositionDTO positionDTO);
        public ResponseWithStatus<Response> UpdatePosition(Position position);
        public ResponseWithStatus<Response> DeletePosition(int positionId);
        public ResponseWithStatus<DataResponse<PageResponse<PositionV>>> GetPositionsPage(PageInfo pageInfo);
        public ResponseWithStatus<DataResponse<List<PositionV>>> GetAllPositions();

    }
    public class PositionService : IPositionService
    {
        public readonly DatabaseContext _context;
        public readonly IMapper _mapper;
        public PositionService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ResponseWithStatus<Response> CreatePosition(PositionDTO positionDTO)
        {
            var position = _mapper.Map<Position>(positionDTO);
            _context.Positions.Add(position);
            var changes = _context.SaveChanges();

            if (changes == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_INSERT_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_INSERT_SUCCESS);
        }

        public ResponseWithStatus<Response> UpdatePosition(Position position)
        {
            _context.Update(position);
            var result = _context.SaveChanges();

            if (result == 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_UPDATE_FAILED);
            }
            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_UPDATE_SUCCESS);
        }


        public ResponseWithStatus<Response> DeletePosition(int positionId)
        {
            var position = _context.Positions.Find(positionId);

            if (position == null)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.NotFound, MessageConstants.MESSAGE_RECORD_NOT_FOUND);
            }

            _context.Positions.Remove(position);
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.BadRequest, MessageConstants.MESSAGE_DELETE_FAILED);
            }

            return ResponseBuilder.CreateResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_DELETE_SUCCESS);
        }


        public ResponseWithStatus<DataResponse<PageResponse<PositionV>>> GetPositionsPage(PageInfo pageInfo)
        {
            var positions = _context.PositionV
                .OrderBy(p => p.Id)
                .Skip((pageInfo.PageNumber - 1) * pageInfo.PageSize)
                .Take(pageInfo.PageSize)
                .ToList();

            var countRecords = _context.EmployeeV.ToList().Count;
            var pages = (int) Math.Ceiling(Decimal.Divide(countRecords, pageInfo.PageSize));
            PageResponse<PositionV> pageResponse = new (pages, countRecords, positions);

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, pageResponse);
        }


        public ResponseWithStatus<DataResponse<List<PositionV>>> GetAllPositions() {
            var positions = _context.PositionV.ToList();

            return ResponseBuilder.CreateDataResponseWithStatus(HttpStatusCode.OK, MessageConstants.MESSAGE_SUCCESS_SELECT, positions);
        }
    }
}
