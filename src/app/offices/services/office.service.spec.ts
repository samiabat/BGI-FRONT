import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Office } from '../models/office.model';

import { OfficeService } from './office.service';

describe('OfficeService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let officeService: OfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    officeService = TestBed.inject(OfficeService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getOffices', () => {
    let expectedOffices: Office[];

    beforeEach(() => {
      officeService = TestBed.inject(OfficeService);
      expectedOffices = [
        { id: 1, name: 'AAU' },
        { id: 2, name: 'AAiT' },
      ] as Office[];
    });

    it('should return expected Offices', () => {
      officeService.getOffices().subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return Offices')
            .toEqual(expectedOffices),
        error: fail,
      });

      const req = httpTestingController.expectOne(officeService.url);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedOffices);
    });

    it('should return expected Office with given id', () => {
      const id = 2;
      officeService.getOffice(id).subscribe({
        next: (data) =>
          expect(data)
            .withContext('should return Offices')
            .toEqual(expectedOffices[1]),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedOffices[1]);
    });

    it('should fail when given non existent id', () => {
      const id = 3;
      const emsg = 'Error: Not Found';
      officeService.getOffice(id).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        },
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#updateOffice', () => {
    let office: Office;

    beforeEach(() => {
      officeService = TestBed.inject(OfficeService);
      office = { id: 1, name: 'AAU' } as Office;
    });

    it('should return null given id and office', () => {
      const id = 1;
      officeService.updateOffice(id, office).subscribe({
        next: (data) =>
          expect(data).withContext('should return null').toBeNull(),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    });

    it('should fail when given non existent id', () => {
      const id = 3;
      const emsg = 'Error: Not Found';
      officeService.updateOffice(id, office).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        },
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#deleteOffice', () => {
    beforeEach(() => {
      officeService = TestBed.inject(OfficeService);
    });

    it('should return null given id and Office', () => {
      const id = 1;
      officeService.deleteOffice(id).subscribe({
        next: (data) =>
          expect(data).withContext('should return null').toBeNull(),
        error: fail,
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });

    it('should fail when given non existent id', () => {
      const id = 3;
      const emsg = 'Error: Not Found';
      officeService.deleteOffice(id).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(404);
          expect(error.error).withContext('message').toEqual(emsg);
        },
      });

      const req = httpTestingController.expectOne(`${officeService.url}/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });
});